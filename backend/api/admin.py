from django.contrib import admin
from .models import (
    KnowledgeEntry, AnonymousSession, Conversation,
    Message, MessageFeedback, UnansweredQuery, ContactEnquiry
)

@admin.register(KnowledgeEntry)
class KnowledgeEntryAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'status', 'updated_at')
    list_filter = ('category', 'status')
    search_fields = ('title', 'content', 'tags')

@admin.register(Conversation)
class ConversationAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'anon_session', 'created_at', 'updated_at')
    search_fields = ('title',)

@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ('id', 'conversation', 'role', 'created_at', 'latency_ms', 'is_grounded')
    list_filter = ('role', 'is_grounded')

@admin.register(MessageFeedback)
class MessageFeedbackAdmin(admin.ModelAdmin):
    list_display = ('id', 'message', 'rating', 'created_at')
    list_filter = ('rating',)

@admin.register(UnansweredQuery)
class UnansweredQueryAdmin(admin.ModelAdmin):
    list_display = ('id', 'query_text', 'resolved', 'created_at')
    list_filter = ('resolved',)

@admin.register(ContactEnquiry)
class ContactEnquiryAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'created_at')
    search_fields = ('name', 'email', 'subject')
