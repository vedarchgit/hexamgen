import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
from .core.config import settings
from .routers import subjects, notes, quizzes, pyq, heatmap, gamification, leaderboard, study_plan

# Create uploads directory
os.makedirs(settings.uploads_dir, exist_ok=True)

app = FastAPI(title=settings.app_name)

app.mount("/uploads", StaticFiles(directory=settings.uploads_dir), name="uploads")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(subjects.router, prefix=settings.api_v1_prefix)
app.include_router(notes.router, prefix=settings.api_v1_prefix)
app.include_router(quizzes.router, prefix=settings.api_v1_prefix)
app.include_router(pyq.router, prefix=settings.api_v1_prefix)
app.include_router(heatmap.router, prefix=settings.api_v1_prefix)
app.include_router(gamification.router, prefix=settings.api_v1_prefix)
app.include_router(leaderboard.router, prefix=settings.api_v1_prefix)
app.include_router(study_plan.router, prefix=settings.api_v1_prefix)

@app.get("/")
async def root():
    return {"status": "ok", "name": settings.app_name}

# For local run: uvicorn backend.app.main:app --reload
if __name__ == "__main__":
    uvicorn.run("backend.app.main:app", host="0.0.0.0", port=8000, reload=True)
