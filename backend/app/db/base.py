"""app/db/base.py

Create SQLAlchemy engine & sessionmaker"""


from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

SQLALCHEMY_DATABASE_URL = (
    f"postgresql://{settings.POSTGRES_USER}:{settings.POSTGRES_PASSWORD}"
    f"@{settings.POSTGRES_HOST}:{settings.POSTGRES_PORT}/{settings.POSTGRES_DB}"
)

engine = create_engine(SQLALCHEMY_DATABASE_URL, echo=True)  # echo for dev, disable in prod
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Dependency for API routes
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
