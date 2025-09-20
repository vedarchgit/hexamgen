from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from core.db import get_db
from core.security import get_current_user
from auth.models import User
from . import service

router = APIRouter(prefix="/analytics", tags=["analytics"])

@router.get("/quiz-performance")
def get_quiz_performance_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return service.get_quiz_performance(db)

@router.get("/timetable-usage")
def get_timetable_usage_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return service.get_timetable_usage(db)

@router.get("/leaderboard-trends")
def get_leaderboard_trends_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return service.get_leaderboard_trends(db)
