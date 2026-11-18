# Riverview College Management System with AI-Powered Chatbot

A full-stack, IEEE 830-compliant college management web application featuring a conversational virtual assistant powered by **Google Gemini 3.5 Flash**, strictly grounded in official college data for **Riverview College**, with a modern responsive frontend strictly adhering to the design specification.

---

## 🏛️ Project Overview

- **Frontend**: React 18 single-page application (SPA) with Vite, responsive design, custom SVG iconography, and modal dialogs.
- **Backend**: Django 6 + Django REST Framework (DRF) exposing REST endpoints for public data, admissions inquiries, conversation history, and admin analytics.
- **AI Core**: Google Gemini API (`gemini-3.5-flash`) via the `google-genai` SDK.
- **Grounding Architecture**: Retrieval-Augmented Generation (RAG) module matching user queries against 24 seeded knowledge entries across 13 college categories.
- **Security & Persona**: Zero identity leakage (FR-4.6, Section 5.4), warm and cheerful tone (PR-1 to PR-6), prompt injection resistance, and resilient local knowledge synthesis fallback.

---

## 📂 Project Structure

```
├── backend/
│   ├── api/
│   │   ├── admin.py             # Django admin registration
│   │   ├── gemini_service.py    # Gemini-3.5-Flash caller, system prompt, guardrails
│   │   ├── models.py            # KnowledgeEntry, Conversation, Message, Feedback, etc.
│   │   ├── rag_service.py       # Keyword & category RAG retrieval engine
│   │   ├── seed_data.py         # 24 comprehensive Riverview College knowledge entries
│   │   ├── serializers.py       # DRF serializers
│   │   ├── urls.py              # API endpoint routing
│   │   └── views.py             # Chat, Conversation, Feedback, College Data, Admin APIs
│   ├── backend_project/
│   │   ├── settings.py          # CORS, DRF, and Gemini configuration
│   │   └── urls.py
│   ├── manage.py
│   ├── seed.py                  # Database population runner
│   ├── test_chat.py             # Grounding test script
│   ├── test_guardrails.py       # Identity & off-topic probe testing
│   └── test_suite.py            # Automated 9-point verification test suite
│
├── frontend/
│   ├── public/
│   │   └── assets/              # Extracted mockup assets (crest, robot, news, skyline)
│   ├── src/
│   │   ├── components/
│   │   │   ├── AdminDashboard.jsx     # Analytics, unanswered queries, knowledge CRUD
│   │   │   ├── ApplyModal.jsx         # Online admissions application modal
│   │   │   ├── ChatDrawer.jsx         # Conversation history drawer & management
│   │   │   ├── ChatbotView.jsx        # Dedicated AI Chatbot view matching mockup
│   │   │   ├── ContactModal.jsx       # Admissions office message submission modal
│   │   │   ├── FloatingChatButton.jsx # Bottom-right floating chatbot launcher
│   │   │   ├── Footer.jsx             # Architectural footer with social links
│   │   │   ├── HeroSection.jsx        # "Learn Today, Lead Tomorrow" hero
│   │   │   ├── Navbar.jsx             # Navigation bar with dropdowns & search
│   │   │   ├── NewsAndPrograms.jsx    # Latest news cards & program banner
│   │   │   ├── ProgramsModal.jsx      # Academic degree catalog explorer
│   │   │   ├── SearchModal.jsx        # Instant site search modal
│   │   │   ├── StatCards.jsx          # 4 feature cards
│   │   │   └── VisitModal.jsx         # Campus tour scheduling modal
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

## 🚀 Quick Start Guide

### Prerequisites
- Python 3.11+
- Node.js 18+ and npm

---

### 1. Backend Setup (Django)

```bash
cd backend

# Install dependencies
python -m pip install django djangorestframework django-cors-headers google-genai

# Apply database migrations
python manage.py migrate

# Seed the Riverview College knowledge base
python seed.py

# Run the backend server (runs on http://localhost:8000)
python manage.py runserver 8000
```

---

### 2. Frontend Setup (React + Vite)

```bash
cd frontend

# Install dependencies
npm install

# Start the development server (runs on http://localhost:5173)
npm run dev
```

Visit **http://localhost:5173/** in your browser.

---

## 🧪 Running System Tests

To run the automated verification test suite:

```bash
cd backend
python test_suite.py
```

This verifies:
1. Knowledge base integrity (24 published entries).
2. Public college REST API endpoints.
3. Chat in-scope RAG grounding.
4. Multi-turn conversation persistence.
5. Zero-leakage identity protection and off-topic deflection.
6. Thumbs-up/down message feedback submission.
7. Contact inquiry submission.
8. Admin metrics and analytics calculation.
9. Conversation listing and title renaming.

---

## 🔑 Configuration

Gemini API configuration is located in `backend/backend_project/settings.py`:
- `GEMINI_MODEL = "gemini-3.5-flash"`
- `GEMINI_API_KEY = "YOUR_API_KEY"`
