from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from core.db import get_db
from core.security import get_current_user
from auth.models import User
from . import schemas, service

router = APIRouter(prefix="/quiz", tags=["quiz"])

@router.post("/create", response_model=schemas.QuizRead)
def create_quiz(
    quiz: schemas.QuizCreate,
    db: Session = Depends(get_db)
):
    return service.create_quiz(db, quiz, current_user)

@router.get("/{quiz_id}", response_model=schemas.QuizRead)
def get_quiz(
    quiz_id: int,
    db: Session = Depends(get_db)
):
    quiz = service.get_quiz(db, quiz_id)
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")
    return quiz

@router.post("/{quiz_id}/submit")
def submit_quiz(
    quiz_id: int,
    submission: schemas.QuizSubmit,
    db: Session = Depends(get_db)
):
    score = service.calculate_score(db, quiz_id, submission, current_user)
    return {"message": "Quiz submitted successfully", "score": score}
