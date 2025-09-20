from sqlalchemy import Column, Integer, String, ForeignKey, TIMESTAMP, func, Text
from sqlalchemy.orm import relationship
from app.models.base import Base

class PYQFile(Base):
    __tablename__ = "pyq_files"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, nullable=False)
    subject = Column(String, nullable=False)
    year = Column(Integer, nullable=False)
    uploader_id = Column(Integer, ForeignKey("users.id"))
    uploaded_at = Column(TIMESTAMP(timezone=True), server_default=func.now())

    uploader = relationship("User", backref="uploaded_pyqs")
    questions = relationship("Question", back_populates="pyq_file")

class Question(Base):
    __tablename__ = "questions"

    id = Column(Integer, primary_key=True, index=True)
    pyq_file_id = Column(Integer, ForeignKey("pyq_files.id"))
    text = Column(Text, nullable=False)
    topic = Column(String, index=True)
    perplexity = Column(String, nullable=True)  # store perplexity score string or float

    pyq_file = relationship("PYQFile", back_populates="questions")