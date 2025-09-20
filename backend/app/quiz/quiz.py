from sqlalchemy import Column, Integer, String, ForeignKey, TIMESTAMP, func, Text
from sqlalchemy.orm import relationship
from app.models.base import Base

class Quiz(Base):
    __tablename__ = "quizzes"

    id = Column(Integer, primary_key=True, index=True)
    creator_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())

    creator = relationship("User")
    questions = relationship("QuizQuestion", back_populates="quiz")

class QuizQuestion(Base):
    __tablename__ = "quiz_questions"

    id = Column(Integer, primary_key=True, index=True)
    quiz_id = Column(Integer, ForeignKey("quizzes.id"))
    question_text = Column(Text, nullable=False)
    options = Column(Text, nullable=False)  # JSON stringified list of options
    correct_option = Column(String, nullable=False)

    quiz = relationship("Quiz", back_populates="questions")