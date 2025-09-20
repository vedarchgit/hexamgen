"""Import models here to create tables"""

from app.db.base import engine
from app.models import user, pyq, quiz, timetable, leaderboard

def init_db():
    # Import all models metadata
    import app.models.user
    import app.models.pyq
    import app.models.quiz
    import app.models.timetable
    import app.models.leaderboard
    
    # Create tables
    from app.models import Base
    Base.metadata.create_all(bind=engine)
