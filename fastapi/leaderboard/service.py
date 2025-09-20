from sqlalchemy.orm import Session
from . import models, schemas

def get_leaderboard(db: Session):
    return db.query(models.Leaderboard).order_by(models.Leaderboard.score.desc()).all()

def update_leaderboard_score(db: Session, entry: schemas.LeaderboardCreate):
    # This is a simplified implementation. A real one might update existing entries.
    db_entry = models.Leaderboard(**entry.model_dump())
    db.add(db_entry)
    db.commit()
    db.refresh(db_entry)
    return db_entry
