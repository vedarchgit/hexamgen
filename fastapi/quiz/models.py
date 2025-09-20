from sqlalchemy import Column, Integer, String, ForeignKey, Table, Text
from sqlalchemy.orm import relationship
from core.db import Base

class Quiz(Base):
    __tablename__ = "quizzes"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    created_by_id = Column(Integer, ForeignKey("users.id"))

    created_by = relationship("User")
    questions = relationship("QuizQuestion", back_populates="quiz")

class QuizQuestion(Base):
    __tablename__ = "quiz_questions"

    id = Column(Integer, primary_key=True, index=True)
    quiz_id = Column(Integer, ForeignKey("quizzes.id"))
    pyq_id = Column(Integer, ForeignKey("pyqs.id"), nullable=True) # Link to original PYQ
    question_text = Column(Text, nullable=False)
    correct_option_id = Column(String, nullable=False) # Stores the ID of the correct option (e.g., 'A', 'B', 'C', 'D')

    quiz = relationship("Quiz", back_populates="questions")
    options = relationship("QuizOption", back_populates="question")
    original_pyq = relationship("PYQ")

class QuizOption(Base):
    __tablename__ = "quiz_options"

    id = Column(String, primary_key=True, index=True) # e.g., 'A', 'B', 'C', 'D'
    question_id = Column(Integer, ForeignKey("quiz_questions.id"))
    option_text = Column(Text, nullable=False)

    question = relationship("QuizQuestion", back_populates="options")
