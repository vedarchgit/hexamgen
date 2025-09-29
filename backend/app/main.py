import uvicorn
from fastapi import FastAPI
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
from .core.config import settings
import uuid
from .routers import subjects, notes, quizzes, pyq, heatmap, gamification, leaderboard, study_plan, status
from .models import Subject

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from .db import get_session, Base, engine, SessionLocal

# Create uploads directory
os.makedirs(settings.uploads_dir, exist_ok=True)

@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    # Add default subjects if the table is empty
    async with SessionLocal() as session:
        count = await session.scalar(select(func.count()).select_from(Subject))
        if count == 0:
            default_subjects = [
                Subject(id=str(uuid.uuid4()), code="CS101", year="FE", name="Computer Science I", branch="Computer Engineering"),
                Subject(id=str(uuid.uuid4()), code="MA201", year="SE", name="Mathematics II", branch="Computer Engineering"),
                Subject(id=str(uuid.uuid4()), code="PYQ", year="N/A", name="Previous Year Questions", branch="General"), # Temporary for frontend
            ]
            session.add_all(default_subjects)
            await session.commit()
            print("Default subjects added to the database.")
    yield

app = FastAPI(title=settings.app_name, lifespan=lifespan)

app.mount("/uploads", StaticFiles(directory=settings.uploads_dir), name="uploads")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(subjects.router, prefix=f"{settings.api_v1_prefix}/v1")
app.include_router(notes.router, prefix=f"{settings.api_v1_prefix}/v1")
app.include_router(quizzes.router, prefix=f"{settings.api_v1_prefix}/v1")
app.include_router(pyq.router, prefix=f"{settings.api_v1_prefix}/v1")
app.include_router(heatmap.router, prefix=f"{settings.api_v1_prefix}/v1")
app.include_router(gamification.router, prefix=f"{settings.api_v1_prefix}/v1")
app.include_router(leaderboard.router, prefix=f"{settings.api_v1_prefix}/v1")
app.include_router(study_plan.router, prefix=f"{settings.api_v1_prefix}/v1")
app.include_router(status.router, prefix=f"{settings.api_v1_prefix}/v1")

@app.get("/")
async def root():
    return {"status": "ok", "name": settings.app_name}

# For local run: uvicorn backend.app.main:app --reload
if __name__ == "__main__":
    uvicorn.run("backend.app.main:app", host="0.0.0.0", port=8000, reload=True)
