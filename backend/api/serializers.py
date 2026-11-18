from rest_framework import serializers
from .models import (
    KnowledgeEntry, Conversation, Message, MessageFeedback,
    UnansweredQuery, ContactEnquiry
)

class KnowledgeEntrySerializer(serializers.ModelSerializer):
    category_display = serializers.CharField(source='get_category_display', read_only=True)

    class Meta:
        model = KnowledgeEntry
        fields = '__all__'


class MessageFeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = MessageFeedback
        fields = ['id', 'message', 'rating', 'comment', 'created_at']
        read_only_fields = ['id', 'created_at']


class MessageSerializer(serializers.ModelSerializer):
    feedback_rating = serializers.SerializerMethodField()

    class Meta:
        model = Message
        fields = ['id', 'conversation', 'role', 'content', 'token_count', 'latency_ms', 'is_grounded', 'created_at', 'feedback_rating']

    def get_feedback_rating(self, obj):
        if hasattr(obj, 'feedback'):
            return obj.feedback.rating
        return None


class ConversationSerializer(serializers.ModelSerializer):
    message_count = serializers.SerializerMethodField()
    last_message = serializers.SerializerMethodField()

    class Meta:
        model = Conversation
        fields = ['id', 'title', 'created_at', 'updated_at', 'message_count', 'last_message']

    def get_message_count(self, obj):
        return obj.messages.count()

    def get_last_message(self, obj):
        msg = obj.messages.last()
        return msg.content[:80] if msg else ""


class ContactEnquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactEnquiry
        fields = '__all__'


class UnansweredQuerySerializer(serializers.ModelSerializer):
    class Meta:
        model = UnansweredQuery
        fields = '__all__'
