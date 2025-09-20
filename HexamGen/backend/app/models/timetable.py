"""3. Timetable Upload + Auto-scheduling + Google Calendar sync
a) Timetable Models
app/models/timetable.py"""

from sqlalchemy import Column, Integer, String, ForeignKey, TIMESTAMP, func
from sqlalchemy.orm import relationship
from app.models.base import Base

class Timetable(Base):
    __tablename__ = "timetables"

    id = Column(Integer, primary_key=True, index=True)
    uploader_id = Column(Integer, ForeignKey("users.id"))
    uploaded_at = Column(TIMESTAMP(timezone=True), server_default=func.now())

    slots = relationship("TimetableSlot", back_populates="timetable")

class TimetableSlot(Base):
    __tablename__ = "timetable_slots"

    id = Column(Integer, primary_key=True, index=True)
    timetable_id = Column(Integer, ForeignKey("timetables.id"))
    day_of_week = Column(String, nullable=False)  # e.g., Monday
    start_time = Column(String, nullable=False)   # e.g., 09:00
    end_time = Column(String, nullable=False)     # e.g., 10:00
    subject = Column(String, nullable=False)
    location = Column(String, nullable=True)

    timetable = relationship("Timetable", back_populates="slots")
    