from sqlalchemy import Column, Integer, String, Time, Enum
from core.db import Base
import enum

class DayOfWeek(enum.Enum):
    MONDAY = "MONDAY"
    TUESDAY = "TUESDAY"
    WEDNESDAY = "WEDNESDAY"
    THURSDAY = "THURSDAY"
    FRIDAY = "FRIDAY"
    SATURDAY = "SATURDAY"
    SUNDAY = "SUNDAY"

class ClassSchedule(Base):
    __tablename__ = "class_schedules"

    id = Column(Integer, primary_key=True, index=True)
    batch = Column(String, index=True)
    subject = Column(String)
    day = Column(Enum(DayOfWeek))
    start_time = Column(Time)
    end_time = Column(Time)
