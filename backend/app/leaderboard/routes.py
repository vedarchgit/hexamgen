from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.db.base import get_db
from app.auth.routes import oauth2_scheme
from app.auth.utils import decode_access_token
from app.leaderboard import crud

router = APIRouter(prefix="/leaderboard", tags=["leaderboard"])

@router.get("/get")
def get_leaderboard(top_n: int = 10, db: Session = Depends(get_db)):
    leaderboard = crud.fetch_leaderboard(top_n)
    return {"leaderboard": leaderboard}

@router.post("/update/{xp_gain}")
def update_score(xp_gain: int, token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    payload = decode_access_token(token)
    if not payload:
        return {"error": "Invalid token"}
    user_email = payload.get("sub")
    from app.auth.crud import get_user_by_email
    user = get_user_by_email(db, user_email)
    if not user:
        return {"error": "User not found"}

    crud.update_score_for_user(db, user.id, xp_gain)
    return {"message": "Score updated"}