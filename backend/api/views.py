import uuid
from datetime import datetime, timedelta
from django.db.models import Count, Avg, Q
from django.utils import timezone
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import (
    KnowledgeEntry, AnonymousSession, Conversation, Message,
    MessageFeedback, UnansweredQuery, ContactEnquiry
)
from .serializers import (
    KnowledgeEntrySerializer, ConversationSerializer, MessageSerializer,
    MessageFeedbackSerializer, ContactEnquirySerializer, UnansweredQuerySerializer
)
from .rag_service import retrieve_college_context
from .gemini_service import generate_chat_response
from .seed_data import run_seed

def get_or_create_session(request):
    """Retrieves session from header, query param, or body, or generates a new one."""
    token = (
        request.headers.get('X-Session-Token') or
        request.data.get('session_token') or
        request.query_params.get('session_token')
    )
    if not token or len(token) < 10:
        token = str(uuid.uuid4())

    session, _ = AnonymousSession.objects.get_or_create(session_token=token)
    session.last_seen_at = timezone.now()
    session.save(update_fields=['last_seen_at'])
    return session, token


class ChatAPIView(APIView):
    """
    POST /api/chat/
    Send message, retrieve knowledge context, query Gemini-3.5-flash, persist exchange.
    """
    def post(self, request):
        user_text = request.data.get('message', '').strip()
        conv_id = request.data.get('conversation_id')

        if not user_text:
            return Response({'error': 'Message cannot be empty.'}, status=status.HTTP_400_BAD_REQUEST)

        # Enforce max length constraint (SRS FR-2.9: 500 characters default, allow up to 1000)
        if len(user_text) > 1000:
            return Response({'error': 'Message exceeds length limit of 1000 characters.'}, status=status.HTTP_400_BAD_REQUEST)

        session, session_token = get_or_create_session(request)

        # Find or create conversation
        conversation = None
        if conv_id:
            try:
                conversation = Conversation.objects.get(id=conv_id, anon_session=session)
            except Conversation.DoesNotExist:
                conversation = None

        if not conversation:
            # Auto-title from user message
            title = user_text[:35] + ("..." if len(user_text) > 35 else "")
            conversation = Conversation.objects.create(
                anon_session=session,
                title=title
            )

        # Persist user message
        user_msg = Message.objects.create(
            conversation=conversation,
            role='user',
            content=user_text
        )

        # 1. RAG Retrieval of relevant college data
        context_str, matched_entries, has_match = retrieve_college_context(user_text, top_k=5)

        # If question seems like an inquiry but has no match, log to UnansweredQuery for admin review
        if not has_match and len(user_text.split()) > 2:
            UnansweredQuery.objects.create(
                conversation=conversation,
                query_text=user_text
            )

        # 2. Fetch recent conversation history (last 10 turns)
        history_qs = conversation.messages.filter(id__lt=user_msg.id).order_by('created_at')[:10]
        history = [{'role': m.role, 'content': m.content} for m in history_qs]

        # 3. Call Gemini 3.5 Flash
        ai_res = generate_chat_response(
            user_message=user_text,
            context_str=context_str,
            history_messages=history,
            has_match=has_match,
            temperature=0.3,
            max_tokens=2048
        )

        reply_content = ai_res.get('text', '')
        latency_ms = ai_res.get('latency_ms', 0)
        token_count = ai_res.get('token_count', 0)

        # 4. Save assistant response
        assistant_msg = Message.objects.create(
            conversation=conversation,
            role='assistant',
            content=reply_content,
            latency_ms=latency_ms,
            token_count=token_count,
            is_grounded=has_match
        )

        # Update conversation timestamp
        conversation.updated_at = timezone.now()
        conversation.save(update_fields=['updated_at'])

        return Response({
            'conversation_id': conversation.id,
            'conversation_title': conversation.title,
            'message_id': assistant_msg.id,
            'reply': reply_content,
            'created_at': assistant_msg.created_at,
            'is_grounded': has_match,
            'session_token': session_token,
            'latency_ms': latency_ms,
        }, status=status.HTTP_200_OK)


class ConversationListView(APIView):
    """
    GET /api/conversations/ - List past conversations for current session
    POST /api/conversations/ - Start a new blank conversation
    """
    def get(self, request):
        session, session_token = get_or_create_session(request)
        convs = Conversation.objects.filter(anon_session=session).order_by('-updated_at')
        serializer = ConversationSerializer(convs, many=True)
        return Response({
            'conversations': serializer.data,
            'session_token': session_token
        })

    def post(self, request):
        session, session_token = get_or_create_session(request)
        title = request.data.get('title', 'New Conversation')
        conv = Conversation.objects.create(anon_session=session, title=title)
        return Response(ConversationSerializer(conv).data, status=status.HTTP_201_CREATED)


class ConversationDetailView(APIView):
    """
    GET /api/conversations/<id>/messages/ - Get all messages in conversation
    PATCH /api/conversations/<id>/ - Rename conversation
    DELETE /api/conversations/<id>/ - Delete conversation
    """
    def get(self, request, pk):
        session, _ = get_or_create_session(request)
        try:
            conv = Conversation.objects.get(id=pk, anon_session=session)
        except Conversation.DoesNotExist:
            return Response({'error': 'Conversation not found'}, status=status.HTTP_404_NOT_FOUND)

        messages = conv.messages.all().order_by('created_at')
        serializer = MessageSerializer(messages, many=True)
        return Response({
            'conversation': ConversationSerializer(conv).data,
            'messages': serializer.data
        })

    def patch(self, request, pk):
        session, _ = get_or_create_session(request)
        try:
            conv = Conversation.objects.get(id=pk, anon_session=session)
        except Conversation.DoesNotExist:
            return Response({'error': 'Conversation not found'}, status=status.HTTP_404_NOT_FOUND)

        new_title = request.data.get('title', '').strip()
        if new_title:
            conv.title = new_title[:100]
            conv.save(update_fields=['title', 'updated_at'])

        return Response(ConversationSerializer(conv).data)

    def delete(self, request, pk):
        session, _ = get_or_create_session(request)
        try:
            conv = Conversation.objects.get(id=pk, anon_session=session)
            conv.delete()
            return Response({'message': 'Conversation deleted successfully'}, status=status.HTTP_200_OK)
        except Conversation.DoesNotExist:
            return Response({'error': 'Conversation not found'}, status=status.HTTP_404_NOT_FOUND)


class ClearAllConversationsView(APIView):
    """DELETE /api/conversations/clear_all/ - Delete all user sessions' chats"""
    def delete(self, request):
        session, _ = get_or_create_session(request)
        Conversation.objects.filter(anon_session=session).delete()
        return Response({'message': 'All conversation history cleared.'})


class MessageFeedbackView(APIView):
    """POST /api/messages/<id>/feedback/ - Thumbs up or down"""
    def post(self, request, pk):
        try:
            msg = Message.objects.get(id=pk)
        except Message.DoesNotExist:
            return Response({'error': 'Message not found'}, status=status.HTTP_404_NOT_FOUND)

        rating = request.data.get('rating')
        if rating not in ['up', 'down']:
            return Response({'error': 'Rating must be "up" or "down"'}, status=status.HTTP_400_BAD_REQUEST)

        comment = request.data.get('comment', '')
        feedback, created = MessageFeedback.objects.update_or_create(
            message=msg,
            defaults={'rating': rating, 'comment': comment}
        )
        return Response(MessageFeedbackSerializer(feedback).data, status=status.HTTP_200_OK)


class CollegeDataView(APIView):
    """
    GET /api/college/ - Public college data for front-end pages
    Optional query parameter: ?category=<category>
    """
    def get(self, request, category=None):
        cat = category or request.query_params.get('category')
        qs = KnowledgeEntry.objects.filter(status='published')
        if cat:
            qs = qs.filter(category=cat)

        serializer = KnowledgeEntrySerializer(qs, many=True)
        return Response(serializer.data)


class ContactEnquiryView(APIView):
    """POST /api/contact/ - Store visitor inquiries"""
    def post(self, request):
        serializer = ContactEnquirySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                'message': 'Thank you for reaching out! Riverview Admissions team will get back to you shortly.',
                'enquiry': serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AdminAnalyticsView(APIView):
    """
    GET /api/admin/analytics/
    Admin metrics, unanswered queries, feedback satisfaction, and API status.
    """
    def get(self, request):
        total_conversations = Conversation.objects.count()
        total_messages = Message.objects.count()
        user_messages_count = Message.objects.filter(role='user').count()
        assistant_messages_count = Message.objects.filter(role='assistant').count()

        avg_latency = Message.objects.filter(role='assistant').aggregate(Avg('latency_ms'))['latency_ms__avg'] or 0

        feedback_counts = MessageFeedback.objects.aggregate(
            thumbs_up=Count('id', filter=Q(rating='up')),
            thumbs_down=Count('id', filter=Q(rating='down'))
        )
        total_feedback = feedback_counts['thumbs_up'] + feedback_counts['thumbs_down']
        satisfaction_pct = round((feedback_counts['thumbs_up'] / total_feedback * 100), 1) if total_feedback > 0 else 100.0

        unanswered = UnansweredQuery.objects.order_by('-created_at')[:15]
        enquiries = ContactEnquiry.objects.order_by('-created_at')[:10]

        return Response({
            'total_conversations': total_conversations,
            'total_messages': total_messages,
            'user_messages_count': user_messages_count,
            'assistant_messages_count': assistant_messages_count,
            'avg_latency_ms': round(avg_latency, 1),
            'thumbs_up': feedback_counts['thumbs_up'],
            'thumbs_down': feedback_counts['thumbs_down'],
            'satisfaction_percentage': satisfaction_pct,
            'unanswered_queries': UnansweredQuerySerializer(unanswered, many=True).data,
            'recent_enquiries': ContactEnquirySerializer(enquiries, many=True).data,
        })


class KnowledgeAdminView(APIView):
    """CRUD API for Admin Knowledge Management"""
    def get(self, request):
        entries = KnowledgeEntry.objects.all().order_by('-updated_at')
        return Response(KnowledgeEntrySerializer(entries, many=True).data)

    def post(self, request):
        serializer = KnowledgeEntrySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk=None):
        try:
            entry = KnowledgeEntry.objects.get(id=pk)
        except KnowledgeEntry.DoesNotExist:
            return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = KnowledgeEntrySerializer(entry, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk=None):
        try:
            entry = KnowledgeEntry.objects.get(id=pk)
            entry.delete()
            return Response({'message': 'Deleted successfully'})
        except KnowledgeEntry.DoesNotExist:
            return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)


class SeedDatabaseView(APIView):
    """POST /api/admin/seed/ - Populate or refresh sample knowledge"""
    def post(self, request):
        created, updated = run_seed()
        return Response({
            'message': f'Knowledge base populated successfully! ({created} created, {updated} updated)',
            'total_entries': KnowledgeEntry.objects.count()
        })
