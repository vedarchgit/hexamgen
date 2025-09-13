# hexamgen
Gamified AI-Powered Academic Scheduler &amp; Smart Learning Assistant

Structure:
HexamGen/
│── README.md                 # Project overview + setup guide
│── requirements.txt          # Python dependencies
│── package.json              # Frontend dependencies
│── docker-compose.yml        # Container orchestration (if used)
│── .gitignore
│
├── backend/                  # APIs + AI modules
│   ├── app/
│   │   ├── main.py           # FastAPI entry point
│   │   ├── routes/           # API routes
│   │   │   ├── timetable.py
│   │   │   ├── quiz.py
│   │   │   ├── user.py
│   │   │   └── leaderboard.py
│   │   ├── services/         # Business logic
│   │   │   ├── timetable_solver.py
│   │   │   ├── pyq_parser.py
│   │   │   ├── quiz_generator.py
│   │   │   └── gamification.py
│   │   ├── models/           # DB models (SQLAlchemy)
│   │   │   ├── user.py
│   │   │   ├── timetable.py
│   │   │   ├── quiz.py
│   │   │   └── leaderboard.py
│   │   ├── utils/            # Helper functions
│   │   │   ├── nlp_utils.py
│   │   │   ├── calendar_sync.py
│   │   │   └── auth.py
│   │   └── database.py
│   └── tests/
│       ├── test_timetable.py
│       ├── test_quiz.py
│       ├── test_pyq_parser.py
│       └── test_api.py
│
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


