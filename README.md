# HexamGen

HexamGen is a full-stack educational platform designed to help students prepare for their exams. It provides features like note-taking, daily quizzes, performance tracking through gamification, and analysis of past exam questions.

## ✨ Features

- **📚 Subject & Note Management:** Organize notes by subject for easy access.
- **✍️ Daily Quizzes:** Test your knowledge with daily quizzes and get immediate feedback.
- **📈 Gamification & Progress Tracking:** Earn XP, level up, and maintain streaks for consistent learning.
- **🏆 Leaderboard:** Compete with peers and see your rank.
- **🔥 Topic Heatmap:** Visualize the most frequently appearing topics in past exams.
- **📜 PYQ Analyzer:** Review and analyze previous year questions.
- **🗓️ Personalized Study Plan Generation:** Generate customized study schedules based on exam dates and subjects.

## 🛠️ Tech Stack

- **Frontend:**
  - [Next.js](https://nextjs.org/) (React Framework)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [shadcn/ui](https://ui.shadcn.com/) (Component Library)
- **Backend:**
  - [FastAPI](https://fastapi.tiangolo.com/) (Python Web Framework)
  - [SQLAlchemy](https://www.sqlalchemy.org/) (ORM)
  - [Pydantic](https://pydantic-docs.helpmanual.io/) (Data Validation)
- **Database:**
  - [MariaDB](https://mariadb.org/) (MySQL-compatible)
- **Containerization:**
  - [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)

## 🚀 Getting Started

The easiest way to get the entire application running locally is by using Docker.

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed on your machine.
- [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/installation) for manual frontend setup.

### Running with Docker Compose

This command will build the backend image, pull the MariaDB image, and start the database and API services.

```bash
docker-compose up --build
```

- **Backend API** will be available at `http://localhost:8000`.
- **Database** will be accessible on port `3306`.

After starting the Docker containers, navigate to the frontend directory to start the development server:

```bash
# Install frontend dependencies
pnpm install

# Run the frontend development server
pnpm dev
```

- **Frontend Application** will be running at `http://localhost:3000`.

## 🔧 Manual Installation

If you prefer to run the services manually without Docker:

### Backend

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```
2.  **Create a virtual environment and activate it:**
    ```bash
    python -m venv .venv
    source .venv/bin/activate
    ```
3.  **Install Python dependencies:**
    ```bash
    pip install -r requirements.txt
    ```
4.  **Set up a MariaDB/MySQL database** and set the `DATABASE_URL` environment variable.
5.  **Run the backend server:**
    ```bash
    uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
    ```

### Frontend

1.  **Navigate to the project root.**
2.  **Install dependencies:**
    ```bash
    pnpm install
    ```
3.  **Run the development server:**
    ```bash
    pnpm dev
    ```

### Running the Application (After Setup)

To run the application for development:

1.  **Start the Backend:**
    Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
    Run the FastAPI application:
    ```bash
    uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
    ```

2.  **Start the Frontend:**
    Navigate back to the project root directory:
    ```bash
    cd ..
    ```
    Run the Next.js development server:
    ```bash
    pnpm dev
    ```

3.  **Access the Study Plan Feature:**
    Open your browser and go to `http://localhost:3000/study-plan`.
    You can then enter an exam date and subjects to generate a study plan.


## 📂 Project Structure

```
.
├── app/              # Next.js App Router (Frontend Pages)
├── backend/          # FastAPI Application (Backend API)
│   ├── app/          # Core backend application code
│   │   ├── routers/  # API endpoint definitions
│   │   ├── models.py # SQLAlchemy database models
│   │   └── schemas.py# Pydantic data schemas
│   └── Dockerfile
├── components/       # Shared React components
├── public/           # Static assets (images, etc.)
├── docker-compose.yml# Docker Compose configuration
└── package.json      # Frontend dependencies and scripts
```

---

## 📝 Summary of Recent Changes

### Frontend Environment Setup
- Created `.env.local` in the project root with `NEXT_PUBLIC_API_URL=http://127.0.0.1:8000`.
- Installed `axios` and `framer-motion` using `pnpm`.
- Created `lib/api.ts` for a centralized Axios API client.
- Created `components/ui/toaster.tsx`, `components/ui/switch.tsx`, `components/ui/label.tsx` for `shadcn/ui` components.

### Feature Implementations
- **Personalized Study Plan Generation (End-to-End):**
    - **Backend:** Added `StudyPlanCreate` and `StudyPlanOut` schemas; created `backend/app/routers/study_plan.py` with `POST /study-plan` endpoint; integrated router in `main.py`.
    - **Frontend:** Installed `@tanstack/react-query`; created `components/query-provider.tsx`; modified `app/layout.tsx` to include `QueryProvider` and `Toaster`; created `app/study-plan/layout.tsx`, `app/study-plan/components/study-plan-form.tsx`, `app/study-plan/components/study-plan-result.tsx`; modified `app/study-plan/page.tsx` for integration.
- **PYQ Upload & Parsing:**
    - **Backend:** Added imports to `backend/app/routers/pyq.py`; implemented `POST /pyq/upload-pyq` endpoint for PDF upload and metadata storage.
    - **Frontend:** Created `app/pyq-upload/page.tsx` and `app/pyq-upload/layout.tsx` for the upload form.
- **Quiz Creation:**
    - **Backend:** Added `QuizCreate` schema to `backend/app/schemas.py`; implemented `POST /quizzes` endpoint in `backend/app/routers/quizzes.py` for quiz creation.
    - **Frontend:** Created `app/quizzes/new/page.tsx` and `app/quizzes/new/layout.tsx` for the quiz creation form.
- **General Content Upload:**
    - **Frontend:** Created `app/content-upload/page.tsx` and `app/content-upload/layout.tsx` for a generic content upload form, leveraging the existing notes endpoint.
- **Dashboard:**
    - **Frontend:** Created `app/dashboard/page.tsx` and `app/dashboard/layout.tsx` for a unified dashboard with links to other features.
- **Charts & Data Visualization:**
    - **Frontend:** Modified `app/analyzer/page.tsx` to import Recharts components and added a `BarChart` visualizing `YEARLY_TRENDS` data; created `app/analyzer/layout.tsx`.
- **Animations:**
    - **Frontend:** Modified `app/dashboard/page.tsx` to import `motion` from `framer-motion` and applied a fade-in animation to the main content.

### Bug Fixes & Refinements
- **Frontend:** Added `"use client";` to `app/notes/new/page.tsx`; updated `toast` calls in various frontend files to correctly use `sonner` API; enhanced error handling in `app/content-upload/page.tsx` for `toast` messages.
- **Backend:** Re-added `import os` to `backend/app/main.py`; corrected `api_v1_prefix` application to all routers in `backend/app/main.py`; modified `backend/app/routers/notes.py` to handle `subject_code` lookup and explicitly define paths; modified `backend/app/routers/pyq.py` to import `Subject` model.
- **UI/UX:** Removed `card-hover-neon` class from `components/ui/card.tsx` to fix blur on hover.

### Testing Setup (Backend)
- Added `pytest`, `httpx`, `aiosqlite`, `pytest-asyncio` to `backend/requirements.txt`.
- Created `backend/tests/` directory and `backend/tests/test_quizzes.py` with a basic passing test for `create_quiz` endpoint.
- Created `backend/__init__.py`, `backend/app/__init__.py`, and `backend/tests/__init__.py` to make them Python packages.
- Adjusted import paths in `backend/tests/test_quizzes.py` for correct module discovery.

### Documentation
- Updated `README.md` to include "Personalized Study Plan Generation" feature and ensure consistent `uvicorn` command in running instructions.

---

## ✨ Short Summary of Progress

We have successfully implemented several core features including **Personalized Study Plan Generation, PYQ Upload, Quiz Creation, General Content Upload, Dashboard, Charts & Data Visualization, and Animations**. We've also established a **backend testing framework with a passing test**, and addressed numerous **frontend and backend bugs and UI/UX refinements**. The application now has a significantly expanded feature set and a more robust development foundation.

---

## 📦 Updated `backend/requirements.txt`

```
fastapi==0.115.0
uvicorn[standard]==0.30.6
SQLAlchemy[asyncio]==2.0.35
asyncmy==0.2.9
pydantic==2.9.2
python-multipart==0.0.9
pytest==8.2.2
httpx==0.27.0
aiosqlite==0.20.0
pytest-asyncio==0.23.7
```
