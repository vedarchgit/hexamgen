from sqlalchemy import Column, Integer, String, TIMESTAMP, func
from app.models.base import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, nullable=False)  # student/admin
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
