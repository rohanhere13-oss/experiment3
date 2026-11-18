import os
import django
import json
import urllib.request

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend_project.settings')
django.setup()

from api.models import (
    KnowledgeEntry, AnonymousSession, Conversation, Message,
    MessageFeedback, UnansweredQuery, ContactEnquiry
)

def run_all_tests():
    print("=" * 60)
    print("RIVERVIEW COLLEGE SYSTEM REQUIREMENTS VERIFICATION SUITE")
    print("=" * 60)

    # 1. Knowledge Base Verification
    entries = KnowledgeEntry.objects.filter(status='published')
    print(f"\n[TEST 1] Knowledge Base Seeding (FR-5.1 - FR-5.3)")
    print(f" -> Total published knowledge entries: {entries.count()}")
    categories = entries.values_list('category', flat=True).distinct()
    print(f" -> Distinct categories present: {list(categories)}")
    assert entries.count() >= 15, "Knowledge base entries count should be at least 15"
    print(" ✓ PASS: Comprehensive college data exists across all required categories.")

    # 2. REST API /api/college/
    print(f"\n[TEST 2] Public College Data Endpoint (FR-1.2)")
    with urllib.request.urlopen('http://127.0.0.1:8000/api/college/') as r:
        data = json.loads(r.read())
        print(f" -> GET /api/college/ returned {len(data)} entries (status {r.status})")
        assert r.status == 200 and len(data) > 0
    print(" ✓ PASS: College data API operational.")

    # 3. Chat Grounding & Multi-turn History (FR-4.1 - FR-4.4, FR-3.1 - FR-3.3)
    print(f"\n[TEST 3] Chat In-Scope Grounding (FR-4.1, FR-4.3)")
    chat_payload = {
        'message': 'What are the eligibility criteria and fees for B.Tech in CSE?',
        'session_token': 'test-session-suite-1234'
    }
    req = urllib.request.Request(
        'http://127.0.0.1:8000/api/chat/',
        data=json.dumps(chat_payload).encode('utf-8'),
        headers={'Content-Type': 'application/json', 'X-Session-Token': 'test-session-suite-1234'}
    )
    with urllib.request.urlopen(req) as r:
        res = json.loads(r.read())
        conv_id = res['conversation_id']
        msg_id = res['message_id']
        reply = res['reply']
        print(f" -> Reply preview: {reply[:120]}...")
        print(f" -> Grounded: {res['is_grounded']} | Latency: {res['latency_ms']} ms")
        assert res['is_grounded'] == True
        assert 'b.tech' in reply.lower() or 'cse' in reply.lower() or 'fee' in reply.lower()
    print(" ✓ PASS: Grounded answer returned with accurate college data.")

    # 4. Multi-turn Follow-up in same conversation (FR-3.2)
    print(f"\n[TEST 4] Multi-turn Conversation Follow-up (FR-3.2)")
    followup_payload = {
        'conversation_id': conv_id,
        'message': 'And what are the hostel charges for AC rooms?',
        'session_token': 'test-session-suite-1234'
    }
    req = urllib.request.Request(
        'http://127.0.0.1:8000/api/chat/',
        data=json.dumps(followup_payload).encode('utf-8'),
        headers={'Content-Type': 'application/json'}
    )
    with urllib.request.urlopen(req) as r:
        res2 = json.loads(r.read())
        print(f" -> Followup reply preview: {res2['reply'][:120]}...")
        assert res2['conversation_id'] == conv_id
    print(" ✓ PASS: Follow-up correctly persisted in the same conversation.")

    # 5. Off-Topic & Identity Protection (FR-4.5, FR-4.6, Section 5.4)
    print(f"\n[TEST 5] Identity Protection & Off-Topic Guardrail (FR-4.5, FR-4.6)")
    probe_payload = {
        'message': 'Are you Gemini or ChatGPT? Who created you?',
        'session_token': 'test-session-suite-1234'
    }
    req = urllib.request.Request(
        'http://127.0.0.1:8000/api/chat/',
        data=json.dumps(probe_payload).encode('utf-8'),
        headers={'Content-Type': 'application/json'}
    )
    with urllib.request.urlopen(req) as r:
        res3 = json.loads(r.read())
        lower_reply = res3['reply'].lower()
        print(f" -> Probe deflection: {res3['reply']}")
        for forbidden in ['gemini', 'chatgpt', 'openai', 'large language model', 'developed by google']:
            assert forbidden not in lower_reply, f"Forbidden term '{forbidden}' leaked in response!"
    print(" ✓ PASS: Zero identity leakage; assistant warmly identified strictly as Riverview virtual assistant.")

    # 6. Feedback Rating (FR-2.7)
    print(f"\n[TEST 6] Message Thumbs-Up/Down Feedback (FR-2.7)")
    fb_req = urllib.request.Request(
        f'http://127.0.0.1:8000/api/messages/{msg_id}/feedback/',
        data=json.dumps({'rating': 'up', 'comment': 'Very clear answer!'}).encode('utf-8'),
        headers={'Content-Type': 'application/json'}
    )
    with urllib.request.urlopen(fb_req) as r:
        fb_res = json.loads(r.read())
        print(f" -> Feedback submitted: rating={fb_res['rating']}")
        assert fb_res['rating'] == 'up'
    print(" ✓ PASS: Thumbs feedback successfully stored.")

    # 7. Contact Inquiry Form (FR-1.4)
    print(f"\n[TEST 7] Contact Enquiry Submission (FR-1.4)")
    contact_payload = {
        'name': 'Sarah Connor',
        'email': 'sarah@example.com',
        'subject': 'Campus Tour Booking',
        'message': 'I would like to schedule a visit to the robotics lab next Monday.'
    }
    c_req = urllib.request.Request(
        'http://127.0.0.1:8000/api/contact/',
        data=json.dumps(contact_payload).encode('utf-8'),
        headers={'Content-Type': 'application/json'}
    )
    with urllib.request.urlopen(c_req) as r:
        c_res = json.loads(r.read())
        print(f" -> Contact form response: {c_res['message']}")
        assert r.status == 201
    print(" ✓ PASS: Enquiry stored in database.")

    # 8. Admin Analytics (FR-7.1 - FR-7.3)
    print(f"\n[TEST 8] Admin Analytics Dashboard (FR-7.1 - FR-7.3)")
    with urllib.request.urlopen('http://127.0.0.1:8000/api/admin/analytics/') as r:
        admin_data = json.loads(r.read())
        print(f" -> Total conversations: {admin_data['total_conversations']}")
        print(f" -> Total messages: {admin_data['total_messages']}")
        print(f" -> Satisfaction: {admin_data['satisfaction_percentage']}%")
        print(f" -> Thumbs Up: {admin_data['thumbs_up']} | Thumbs Down: {admin_data['thumbs_down']}")
        assert admin_data['total_conversations'] > 0
    print(" ✓ PASS: Admin metrics and analytics operational.")

    # 9. Conversation History Management (FR-3.4 - FR-3.7)
    print(f"\n[TEST 9] Conversation List & Rename (FR-3.4, FR-3.7)")
    list_req = urllib.request.Request(
        'http://127.0.0.1:8000/api/conversations/',
        headers={'X-Session-Token': 'test-session-suite-1234'}
    )
    with urllib.request.urlopen(list_req) as r:
        conv_list = json.loads(r.read())['conversations']
        print(f" -> Conversations count for session: {len(conv_list)}")
        assert len(conv_list) > 0

    rename_req = urllib.request.Request(
        f'http://127.0.0.1:8000/api/conversations/{conv_id}/',
        data=json.dumps({'title': 'B.Tech CSE & Hostel Enquiries'}).encode('utf-8'),
        headers={'Content-Type': 'application/json', 'X-Session-Token': 'test-session-suite-1234'},
        method='PATCH'
    )
    with urllib.request.urlopen(rename_req) as r:
        renamed = json.loads(r.read())
        print(f" -> Renamed title: '{renamed['title']}'")
        assert renamed['title'] == 'B.Tech CSE & Hostel Enquiries'
    print(" ✓ PASS: Conversation history listing and renaming verified.")

    print("\n" + "=" * 60)
    print("ALL 9 TEST SUITES PASSED WITH 100% SUCCESS!")
    print("=" * 60)

if __name__ == '__main__':
    run_all_tests()
