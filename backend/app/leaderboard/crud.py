from sqlalchemy.orm import Session
from app.models.leaderboard import Leaderboard
from app.leaderboard.firebase_client import update_user_score, get_leaderboard

def update_score_for_user(db: Session, user_id: int, xp_gain: int):
    lb = db.query(Leaderboard).filter(Leaderboard.user_id == user_id).first()
    if not lb:
        lb = Leaderboard(user_id=user_id, xp=0, badges=0, streak=0)
        db.add(lb)
    lb.xp += xp_gain
    db.commit()
    update_user_score(user_id, xp_gain)

def fetch_leaderboard(top_n: int = 10):
    return get_leaderboard(top_n)
    