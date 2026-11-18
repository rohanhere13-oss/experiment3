from django.urls import path
from .views import (
    ChatAPIView,
    ConversationListView,
    ConversationDetailView,
    ClearAllConversationsView,
    MessageFeedbackView,
    CollegeDataView,
    ContactEnquiryView,
    AdminAnalyticsView,
    KnowledgeAdminView,
    SeedDatabaseView,
)

urlpatterns = [
    # Chat & Assistant
    path('chat/', ChatAPIView.as_view(), name='api-chat'),
    path('conversations/', ConversationListView.as_view(), name='conversation-list'),
    path('conversations/clear_all/', ClearAllConversationsView.as_view(), name='conversation-clear-all'),
    path('conversations/<int:pk>/', ConversationDetailView.as_view(), name='conversation-detail'),
    path('conversations/<int:pk>/messages/', ConversationDetailView.as_view(), name='conversation-messages'),
    path('messages/<int:pk>/feedback/', MessageFeedbackView.as_view(), name='message-feedback'),

    # Public College Data
    path('college/', CollegeDataView.as_view(), name='college-data'),
    path('college/<str:category>/', CollegeDataView.as_view(), name='college-data-category'),
    path('contact/', ContactEnquiryView.as_view(), name='contact-enquiry'),

    # Admin Dashboard & Knowledge Management
    path('admin/analytics/', AdminAnalyticsView.as_view(), name='admin-analytics'),
    path('admin/knowledge/', KnowledgeAdminView.as_view(), name='admin-knowledge-list'),
    path('admin/knowledge/<int:pk>/', KnowledgeAdminView.as_view(), name='admin-knowledge-detail'),
    path('admin/seed/', SeedDatabaseView.as_view(), name='admin-seed'),
]
