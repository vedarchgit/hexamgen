from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Dict
from app.db.base import get_db
from app.auth.routes import oauth2_scheme
from app.auth.utils import decode_access_token
from app.quiz import crud, schemas

router = APIRouter(prefix="/quiz", tags=["quiz"])

@router.post("/create", response_model=schemas.QuizOut)
def create_quiz(quiz_in: schemas.QuizCreate, token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    payload = decode_access_token(token)
    if not payload:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    user_email = payload.get("sub")
    from app.auth.crud import get_user_by_email
    user = get_user_by_email(db, user_email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    quiz = crud.create_quiz(db, user.id, quiz_in.title, quiz_in.pyq_file_id)
    if not quiz:
        raise HTTPException(status_code=404, detail="PYQ File not found")
    return quiz

@router.get("/{quiz_id}", response_model=schemas.QuizOut)
def get_quiz(quiz_id: int, db: Session = Depends(get_db)):
    quiz = crud.get_quiz(db, quiz_id)
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")
    return quiz

@router.post("/{quiz_id}/submit")
def submit_quiz(quiz_id: int, answers: Dict[str, str], token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    payload = decode_access_token(token)
    if not payload:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    user_email = payload.get("sub")
    from app.auth.crud import get_user_by_email
    user = get_user_by_email(db, user_email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    result = crud.submit_quiz(db, quiz_id, answers, user.id)
    if not result:
        raise HTTPException(status_code=404, detail="Quiz not found or submission failed")
    return result