import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend_project.settings')
django.setup()

from api.rag_service import retrieve_college_context
from api.gemini_service import generate_chat_response

query = "What are the engineering courses and hostel fees at Riverview College?"
context, matches, has_match = retrieve_college_context(query)

print(f"Matched {len(matches)} entries. Has match: {has_match}")
for m in matches:
    print(f" - {m['title']}")

print("\nGenerating AI response with gemini-3.5-flash...")
res = generate_chat_response(query, context)
print("\nResponse from Gemini 3.5 Flash:")
print(res['text'])
print(f"\nLatency: {res['latency_ms']} ms | Tokens: {res['token_count']}")
