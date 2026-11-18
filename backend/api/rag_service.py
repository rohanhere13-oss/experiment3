import re
from .models import KnowledgeEntry, UnansweredQuery

# Stopwords to ignore in keyword extraction
STOPWORDS = {
    'what', 'when', 'where', 'which', 'who', 'whom', 'whose', 'why', 'how',
    'a', 'an', 'the', 'and', 'or', 'but', 'if', 'because', 'as', 'until',
    'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between',
    'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to',
    'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again',
    'further', 'then', 'once', 'here', 'there', 'all', 'any', 'both', 'each',
    'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only',
    'own', 'same', 'so', 'than', 'too', 'very', 'can', 'will', 'just', 'should',
    'now', 'is', 'am', 'are', 'was', 'were', 'be', 'been', 'being', 'have',
    'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'i', 'me', 'my',
    'myself', 'we', 'our', 'ours', 'ourselves', 'you', 'your', 'yours', 'tell',
    'please', 'give', 'know', 'want', 'details', 'information', 'info'
}

def extract_keywords(text: str) -> list[str]:
    words = re.findall(r'[a-zA-Z0-9]+', text.lower())
    return [w for w in words if w not in STOPWORDS and len(w) > 2]

def retrieve_college_context(query: str, top_k: int = 5) -> tuple[str, list[dict], bool]:
    """
    Retrieves the most relevant KnowledgeEntry records for the given query.
    Returns:
        context_str: Formatted context block for the prompt
        matched_entries: List of matched entry dicts
        has_match: Boolean indicating if relevant college info was found
    """
    keywords = extract_keywords(query)
    entries = KnowledgeEntry.objects.filter(status='published')

    if not entries.exists():
        return "", [], False

    scored_entries = []
    query_lower = query.lower()

    for entry in entries:
        score = 0
        title_lower = entry.title.lower()
        content_lower = entry.content.lower()
        tags_lower = (entry.tags or "").lower()
        category_lower = entry.category.lower()

        # Check for phrase matches
        if len(query_lower) > 4 and query_lower in content_lower:
            score += 10
        if len(query_lower) > 4 and query_lower in title_lower:
            score += 15

        # Check keyword matches
        for kw in keywords:
            if kw in title_lower:
                score += 5
            if kw in tags_lower:
                score += 4
            if kw in category_lower:
                score += 4
            if kw in content_lower:
                score += 2

        if score > 0:
            scored_entries.append((score, entry))

    scored_entries.sort(key=lambda x: x[0], reverse=True)
    top_matches = [entry for score, entry in scored_entries[:top_k]]

    has_match = len(top_matches) > 0

    # Build context string
    # Always include the core college identity and contact summary so the assistant is grounded
    core_summary = """
[COLLEGE PROFILE]
College Name: Riverview College
Tagline: Learn Today, Lead Tomorrow. A vibrant community. World-class education.
Location: 100 University Boulevard, Riverview Valley, Riverside Campus - 560098
Contact Office: Phone: +1 (800) 555-RIVER / +91 (80) 2856-7890 | Email: admissions@riverview.edu, info@riverview.edu
Hours: Mon-Fri 9:00 AM - 5:00 PM, Sat 9:00 AM - 1:00 PM
Accreditation: NAAC A++, ABET accredited engineering, NIRF Top-20 Rank
"""

    if not top_matches:
        # If no specific matches, return core summary with flag False
        return core_summary.strip(), [], False

    context_parts = [core_summary.strip(), "\n[RELEVANT COLLEGE DATA]"]
    matched_info = []

    for entry in top_matches:
        context_parts.append(f"\n--- {entry.title} ({entry.get_category_display()}) ---\n{entry.content}")
        matched_info.append({
            'id': entry.id,
            'title': entry.title,
            'category': entry.category,
        })

    return "\n".join(context_parts), matched_info, has_match
