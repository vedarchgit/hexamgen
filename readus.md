

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

