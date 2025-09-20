from sqlalchemy import Column, Integer, String, Text
from core.db import Base

class PYQ(Base):
    __tablename__ = "pyqs"

    id = Column(Integer, primary_key=True, index=True)
    subject = Column(String, index=True)
    year = Column(Integer, index=True)
    topic = Column(String, index=True)
    question_text = Column(Text)
