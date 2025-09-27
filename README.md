# HexamGen

HexamGen is a full-stack educational platform designed to help students prepare for their exams. It provides features like note-taking, daily quizzes, performance tracking through gamification, and analysis of past exam questions.

## ✨ Features

- **📚 Subject & Note Management:** Organize notes by subject for easy access.
- **✍️ Daily Quizzes:** Test your knowledge with daily quizzes and get immediate feedback.
- **📈 Gamification & Progress Tracking:** Earn XP, level up, and maintain streaks for consistent learning.
- **🏆 Leaderboard:** Compete with peers and see your rank.
- **🔥 Topic Heatmap:** Visualize the most frequently appearing topics in past exams.
- **📜 PYQ Analyzer:** Review and analyze previous year questions.

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
    uvicorn app.main:app --reload --port 8000
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