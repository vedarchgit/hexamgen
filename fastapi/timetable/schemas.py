from pydantic import BaseModel
from datetime import time
from .models import DayOfWeek

class ClassScheduleBase(BaseModel):
    batch: str
    subject: str
    day: DayOfWeek
    start_time: time
    end_time: time

class ClassScheduleCreate(ClassScheduleBase):
    pass

class ClassScheduleRead(ClassScheduleBase):
    id: int

    model_config = {"from_attributes": True}
