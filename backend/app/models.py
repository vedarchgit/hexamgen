from sqlalchemy import (
    Column, String, Integer, Text, Boolean, ForeignKey, DateTime, JSON, UniqueConstraint
)
from sqlalchemy.orm import relationship, Mapped, mapped_column
from datetime import datetime
from .db import Base

def now() -> datetime:
    return datetime.utcnow()

class User(Base):
    __tablename__ = "users"
    id: Mapped[str] = mapped_column(String(64), primary_key=True)  # maps to auth user id or UUID
    email: Mapped[str | None] = mapped_column(String(255), unique=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=now)

class Profile(Base):
    __tablename__ = "profiles"
    user_id: Mapped[str] = mapped_column(String(64), ForeignKey("users.id"), primary_key=True)
    display_name: Mapped[str | None] = mapped_column(String(120))
    avatar_url: Mapped[str | None] = mapped_column(String(255))

class Subject(Base):
    __tablename__ = "subjects"
    id: Mapped[str] = mapped_column(String(36), primary_key=True)  # UUID
    code: Mapped[str] = mapped_column(String(32), index=True)
    year: Mapped[str] = mapped_column(String(8))  # FE/SE/TE/BE
    name: Mapped[str] = mapped_column(String(160))
    branch: Mapped[str] = mapped_column(String(80), default="Computer Engineering")

class Note(Base):
    __tablename__ = "notes"
    id: Mapped[str] = mapped_column(String(36), primary_key=True)  # UUID
    subject_id: Mapped[str] = mapped_column(String(36), ForeignKey("subjects.id"), index=True)
    title: Mapped[str] = mapped_column(String(200))
    content_md: Mapped[str | None] = mapped_column(Text)
    content_url: Mapped[str | None] = mapped_column(String(255))
    created_by: Mapped[str] = mapped_column(String(64), ForeignKey("users.id"))
    created_at: Mapped[datetime] = mapped_column(DateTime, default=now)

class Quiz(Base):
    __tablename__ = "quizzes"
    id: Mapped[str] = mapped_column(String(36), primary_key=True)
    subject_id: Mapped[str | None] = mapped_column(String(36), ForeignKey("subjects.id"), index=True)
    title: Mapped[str] = mapped_column(String(200))
    is_daily: Mapped[bool] = mapped_column(Boolean, default=False)
    questions: Mapped[dict] = mapped_column(JSON)  # list of {id, text, choices, correct}
    created_at: Mapped[datetime] = mapped_column(DateTime, default=now)

class QuizAttempt(Base):
    __tablename__ = "quiz_attempts"
    id: Mapped[str] = mapped_column(String(36), primary_key=True)
    quiz_id: Mapped[str] = mapped_column(String(36), ForeignKey("quizzes.id"), index=True)
    user_id: Mapped[str] = mapped_column(String(64), ForeignKey("users.id"), index=True)
    score: Mapped[int] = mapped_column(Integer)
    answers: Mapped[dict] = mapped_column(JSON)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=now)

class PYQ(Base):
    __tablename__ = "pyqs"
    id: Mapped[str] = mapped_column(String(36), primary_key=True)
    subject_id: Mapped[str] = mapped_column(String(36), ForeignKey("subjects.id"), index=True)
    exam_year: Mapped[int] = mapped_column(Integer)
    term: Mapped[str | None] = mapped_column(String(32))
    question_text: Mapped[str] = mapped_column(Text)
    topics: Mapped[list[str] | None] = mapped_column(JSON)
    difficulty: Mapped[int | None] = mapped_column(Integer)

class HeatmapTopic(Base):
    __tablename__ = "heatmap_topics"
    id: Mapped[str] = mapped_column(String(36), primary_key=True)
    subject_id: Mapped[str] = mapped_column(String(36), ForeignKey("subjects.id"))
    topic: Mapped[str] = mapped_column(String(160))
    intensity: Mapped[float] = mapped_column(Integer)  # store int 0-100 for simplicity

    __table_args__ = (UniqueConstraint("subject_id", "topic", name="uq_subject_topic"),)

class XPEvent(Base):
    __tablename__ = "xp_events"
    id: Mapped[str] = mapped_column(String(36), primary_key=True)
    user_id: Mapped[str] = mapped_column(String(64), ForeignKey("users.id"), index=True)
    kind: Mapped[str] = mapped_column(String(48))  # quiz_attempt, note_read, streak_increment, etc.
    amount: Mapped[int] = mapped_column(Integer)
    meta: Mapped[dict | None] = mapped_column(JSON)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=now)

class UserTotals(Base):
    __tablename__ = "user_totals"
    user_id: Mapped[str] = mapped_column(String(64), ForeignKey("users.id"), primary_key=True)
    xp_total: Mapped[int] = mapped_column(Integer, default=0)
    level: Mapped[int] = mapped_column(Integer, default=1)
    streak: Mapped[int] = mapped_column(Integer, default=0)
    last_active: Mapped[datetime | None] = mapped_column(DateTime)
