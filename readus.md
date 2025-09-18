

📘 HexamGen – Gamified AI-Powered Academic Scheduler & Smart Learning Assistant

🏆 Smart India Hackathon 2025 – Team HexamGen (MESCOE, Pune)


---

📌 Problem Statement

Students and faculty face fragmented academic workflows: static timetables prone to clashes, scattered past year question papers (PYQs), and monotonous study methods. This leads to wasted time, lack of engagement, and ineffective exam prep.

HexamGen solves this by combining:
✅ AI-powered timetable generator (conflict-free + Google Calendar sync)
✅ PYQ analysis to highlight high-frequency topics
✅ Auto-generated quizzes & flashcards for practice
✅ Gamification (streaks, badges, leaderboards)


---

🎯 Objective

Build a unified academic assistant that reduces admin burden, keeps students motivated, and improves exam outcomes.


---

👥 Team HexamGen

Member	Role

Vedant	AI/Backend Lead (FastAPI, NLP, ML)
Gargee	Database + Pitch Deck
Sejal	PYQ Parser + Admin Review
Ayush	Timetable Solver + Calendar Sync
Harshwardhan	Java Expert + Frontend (Gamification, Quiz UI)
Tarendra	Frontend (React + Tailwind UI)



---

🛠️ Tech Stack

Backend: FastAPI / Django REST, Python

AI/NLP: spaCy, NLTK, Hugging Face (T5, BERT)

Timetable Solver: Google OR-Tools, Graph Coloring

Frontend (Web): React + TailwindCSS

Mobile: Java/Kotlin (Android)

Database: PostgreSQL / MongoDB + Firebase (Leaderboard)

Integration: Google Calendar API, OAuth

Visualization: Plotly, Matplotlib



---

🚀 Quick Start Setup

🔧 1. Clone Repository

git clone https://github.com/<your-org>/HexamGen.git
cd HexamGen


---

🖥️ 2. Backend Setup (FastAPI + AI)

cd backend
python3 -m venv venv
source venv/bin/activate   # (Linux/Mac)
venv\Scripts\activate      # (Windows)

pip install -r ../requirements.txt

# Run FastAPI server
uvicorn app.main:app --reload

API will run on → http://127.0.0.1:8000

Swagger Docs → http://127.0.0.1:8000/docs



---

🌐 3. Frontend Setup (React + Tailwind)

cd frontend
npm install
npm start

Frontend will run on → http://localhost:3000



---

📱 4. Mobile (Optional)

Open mobile/ in Android Studio → Build & Run.


---

🗄️ 5. Database Setup

PostgreSQL / MongoDB (choose one):

# Example PostgreSQL
CREATE DATABASE hexamgen;

Run migrations:

cd database
psql -U <username> -d hexamgen -f schema.sql


---

📊 6. Sample Data

Put PYQs (PDFs) into:

HexamGen/data/pyqs/

Run parser → generates structured data in /processed

python backend/app/services/pyq_parser.py


---

🎮 7. Demo Flow

1. Upload PYQs → Extract frequent topics.


2. Auto-generate quiz → Admin approves.


3. Student plays quiz → XP & badges update leaderboard.


4. Timetable → Auto-syncs with Google Calendar.

📑 Product Requirements Document (PRD)

Product Name: HexamGen – Gamified AI-Powered Academic Scheduler & Smart Learning Assistant
Team: HexamGen (MESCOE, Pune)

1. Overview

Problem: Students and faculty struggle with fragmented academic workflows — timetable clashes, scattered PYQs/notes, and passive, unstructured study practices.

Solution: HexamGen is an AI-powered academic assistant that unifies smart scheduling, PYQ analysis, adaptive quiz generation, and gamification into a single platform. It automates scheduling, identifies high-priority topics, generates practice quizzes, and motivates learning through gamified rituals.

Target Users:

Students – need smart timetables, targeted practice, engaging learning.

Faculty/Admins – need efficient scheduling, reduced clash management, insights into student progress.

2. Goals & Non-Goals

Goals:

Generate conflict-free timetables & sync with Google Calendar.

Analyze PYQs to identify frequent/high-weightage topics.

Auto-generate adaptive quizzes & flashcards with AI.

Implement gamification (leaderboards, badges, streaks).

Provide dashboards for students & faculty.

Non-Goals (MVP):

Full-scale AI tutoring for all subjects.

Offline mode for all features.

Large-scale deployment (beyond hackathon scope).

3. Key Features & Requirements
A. Smart Timetable Manager

Inputs: Class schedules, faculty availability.

Processing: Constraint Solver (graph coloring/OR-Tools).

Outputs: Conflict-free timetable + Calendar sync.

Priority: High

B. PYQ Analyzer

Inputs: Past Year Question papers (PDF/CSV).

Processing: NLP (spaCy/regex) → topic extraction & frequency analysis.

Outputs: Topic frequency heatmap.

Priority: High

C. Quiz & Flashcard Generator

Inputs: Topics/subtopics from PYQ analysis.

Processing: LLM-based question generation (T5-small/DistilBERT).

Outputs: Admin-reviewed quizzes + flashcards.

Priority: High

D. Gamification Layer

Features: Leaderboard, XP points, streaks, badges.

Integration: Firebase (real-time updates).

Priority: Medium-High

E. Analytics Dashboard

For Students: Progress tracker, quiz history, streaks.

For Faculty: Topic coverage, student engagement reports.

Priority: Medium

4. User Stories

Student:
“As a student, I want my timetable auto-synced to Google Calendar, so I never miss class changes.”
“As a student, I want AI to highlight important PYQ topics, so I know what to study first.”
“As a student, I want quizzes to feel fun and rewarding, so I stay consistent.”

Faculty/Admin:
“As a faculty member, I want automatic timetable clash detection, so I save time on manual scheduling.”
“As a faculty member, I want to see which topics students practice most, so I can adjust my teaching.”

5. Success Metrics (Hackathon Demo)

✅ Timetable → Generated in <30 seconds, synced with Google Calendar.

✅ PYQs → 2–3 years analyzed, frequency heatmap visible.

✅ Quizzes → 10 MCQs auto-generated & admin-approved.

✅ Engagement → Leaderboard updates live after quiz.

✅ Demo Flow → End-to-end journey works in <5 minutes.

6. Tech Stack
Component	Tools/Tech
Backend	FastAPI/Django REST, Docker
Frontend (Web)	React + Tailwind
Mobile	Java/Kotlin (Android)
Database	PostgreSQL/MongoDB + Firebase (leaderboard)
AI/NLP	spaCy, NLTK, Hugging Face (T5/DistilBERT)
Timetable Solver	OR-Tools, Graph Coloring
APIs	Google Calendar API, OAuth
Visualization	Plotly, Matplotlib
7. Risks & Mitigation

AI generates poor questions → Add manual admin review step.

Time crunch during hackathon → Focus on MVP: timetable + quiz + leaderboard.

Limited compute power → Use smaller models (DistilBERT, T5-small).

UI delays → Start with wireframes + Tailwind prebuilt components.

Structure :
HexamGen/
│── README.md                 # Project overview + setup guide
│── requirements.txt          # Python dependencies
│── package.json              # Frontend dependencies
│── docker-compose.yml        # Container orchestration (if used)
│── .gitignore
│
├── _backend/
├── app/
│   ├── __init__.py
│   ├── main.py   # FastAPI app entrypoint
│   ├── core/
│   │   ├── config.py  # config/env loading
│   │   └── security.py # JWT utils
│   ├── models/
│   │   ├── user.py
│   │   ├── pyq.py
│   │   ├── quiz.py
│   │   ├── timetable.py
│   │   └── leaderboard.py
│   ├── db/
│   │   ├── base.py  # DB session, engine
│   │   └── init_db.py
│   ├── auth/
│   │   ├── schemas.py
│   │   ├── crud.py
│   │   ├── routes.py
│   │   └── utils.py
│   ├── pyq/
│   │   ├── schemas.py
│   │   ├── crud.py
│   │   ├── routes.py
│   │   └── parser.py
│   ├── quiz/
│   │   ├── schemas.py
│   │   ├── crud.py
│   │   ├── routes.py
│   │   └── generator.py
│   ├── timetable/
│   │   ├── schemas.py
│   │   ├── crud.py
│   │   ├── routes.py
│   │   └── scheduler.py
│   ├── leaderboard/
│   │   ├── schemas.py
│   │   ├── crud.py
│   │   ├── routes.py
│   │   └── firebase_client.py
│   ├── analytics/
│       ├── routes.py
│       ├── crud.py
│       └── schemas.py
├── migrations/
├── .env
├── Dockerfile
├── requirements.txt
└── README.md
├── ai_models/                # AI/ML modules
│   ├── quiz_generation.ipynb # Notebook for MCQ generation
│   ├── pyq_analysis.ipynb    # Topic frequency analysis
│   ├── models/               # Saved/optimized models
│   └── evaluation/           # Model evaluation results
│
├── frontend/                 # React + Tailwind frontend
│   ├── public/
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── Dashboard.js
│   │   │   ├── QuizUI.js
│   │   │   ├── Leaderboard.js
│   │   │   └── CalendarSync.js
│   │   ├── pages/            # Page-level components
│   │   │   ├── Home.js
│   │   │   ├── Timetable.js
│   │   │   ├── Quiz.js
│   │   │   └── Profile.js
│   │   ├── assets/           # Icons, images
│   │   ├── styles/           # CSS/Tailwind configs
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── mobile/                   # Android app (optional)
│   ├── app/src/main/java/com/hexamgen/
│   │   ├── activities/
│   │   ├── adapters/
│   │   └── utils/
│   └── build.gradle
│
├── database/                 # DB schema + seed data
│   ├── migrations/
│   ├── schema.sql
│   └── seed_data.sql
│
├── docs/                     # Documentation & design
│   ├── roadmap.md
│   ├── architecture_diagram.png
│   ├── gantt_timeline.png
│   ├── ui_wireframes/
│   └── pitch_deck/
│
└── data/                     # Sample data for testing
├── pyqs/                 # Past year question papers (PDFs)
├── processed/            # Parsed question JSONs
└── quizzes/              # Generated quizzes



Root Cause: Lack of automation in scheduling and content delivery workflows.
HexamGen Solution – How It Addresses the Root Causes Root Cause HexamGen Solution No central PYQ analysis AI-powered PYQ Analyzer → extracts topics,
finds high-frequency questions, builds knowledge maps. Static, clash-prone timetables Smart Timetable Manager → CSP/graph-based scheduling + Google
Calendar sync for instant updates. Passive, boring revision Adaptive Quiz Generator + Gamification → auto-MCQs, flashcards, streaks, badges, leaderboards.
Faculty admin overload Admin Portal → upload PYQs, review AI-generated quizzes, approve/schedule in one click. RCA Visualization (5 Whys)



















---

🤝 Contribution Guide

Create feature branches (feature/timetable, feature/quizUI, etc.).

Use pull requests → review before merging.

Commit messages → fix:, feat:, docs: style.

Focus on MVP → Timetable + Quiz + Leaderboard first.



---

📢 Hackathon Pitch Tip

"HexamGen transforms dull exam prep into an engaging daily ritual — combining AI, smart scheduling, and gamification to help students succeed."


---

