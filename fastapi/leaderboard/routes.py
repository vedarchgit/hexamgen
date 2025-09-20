from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from core.db import get_db
from core.security import get_current_user
from auth.models import User
from . import schemas, service

router = APIRouter(prefix="/leaderboard", tags=["leaderboard"])

@router.get("/", response_model=List[schemas.LeaderboardRead])
def get_top_performers(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return service.get_leaderboard(db)

@router.post("/update", response_model=schemas.LeaderboardRead)
def update_score(
    leaderboard_entry: schemas.LeaderboardCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return service.update_leaderboard_score(db, leaderboard_entry)
