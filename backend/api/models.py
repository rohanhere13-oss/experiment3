from django.db import models
from django.contrib.auth.models import User
import uuid

class KnowledgeEntry(models.Model):
    CATEGORY_CHOICES = [
        ('general', 'General Info'),
        ('academics', 'Academics & Departments'),
        ('courses', 'Courses & Programs'),
        ('eligibility', 'Eligibility & Admissions'),
        ('fees', 'Fee Structure'),
        ('faculty', 'Faculty & Leadership'),
        ('facilities', 'Campus Facilities & Hostels'),
        ('events', 'Events & News'),
        ('placements', 'Placements & Careers'),
        ('scholarships', 'Scholarships & Aid'),
        ('rules', 'Rules & Campus Life'),
        ('contact', 'Contact & Office Details'),
        ('faqs', 'Frequently Asked Questions'),
    ]

    STATUS_CHOICES = [
        ('published', 'Published'),
        ('draft', 'Draft'),
    ]

    title = models.CharField(max_length=255)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='general')
    content = models.TextField()
    tags = models.CharField(max_length=255, blank=True, help_text="Comma-separated keywords for search")
    source_url = models.CharField(max_length=255, blank=True, default='')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='published')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"[{self.category}] {self.title}"


class AnonymousSession(models.Model):
    session_token = models.CharField(max_length=64, unique=True, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)
    last_seen_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"AnonSession({self.session_token[:8]}...)"


class Conversation(models.Model):
    anon_session = models.ForeignKey(AnonymousSession, null=True, blank=True, on_delete=models.CASCADE, related_name='conversations')
    user = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE, related_name='conversations')
    title = models.CharField(max_length=200, default="New Conversation")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-updated_at']

    def __str__(self):
        return f"Conversation {self.id}: {self.title}"


class Message(models.Model):
    ROLE_CHOICES = [
        ('user', 'User'),
        ('assistant', 'Assistant'),
        ('system', 'System'),
    ]

    conversation = models.ForeignKey(Conversation, related_name='messages', on_delete=models.CASCADE)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    content = models.TextField()
    token_count = models.IntegerField(default=0)
    latency_ms = models.IntegerField(default=0)
    is_grounded = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return f"[{self.role}] Conv #{self.conversation_id}: {self.content[:30]}..."


class MessageFeedback(models.Model):
    RATING_CHOICES = [
        ('up', 'Thumbs Up'),
        ('down', 'Thumbs Down'),
    ]

    message = models.OneToOneField(Message, related_name='feedback', on_delete=models.CASCADE)
    rating = models.CharField(max_length=10, choices=RATING_CHOICES)
    comment = models.TextField(blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Feedback for msg {self.message_id}: {self.rating}"


class UnansweredQuery(models.Model):
    conversation = models.ForeignKey(Conversation, null=True, blank=True, on_delete=models.SET_NULL)
    query_text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    resolved = models.BooleanField(default=False)

    def __str__(self):
        return f"Unanswered: {self.query_text[:50]}"


class ContactEnquiry(models.Model):
    name = models.CharField(max_length=150)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Enquiry from {self.name} - {self.subject}"
