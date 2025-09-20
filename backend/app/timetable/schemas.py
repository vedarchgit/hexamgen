from pydantic import BaseModel
from typing import List, Optional

class TimetableSlotCreate(BaseModel):
    day_of_week: str
    start_time: str
    end_time: str
    subject: str
    location: Optional[str]

class TimetableOut(BaseModel):
    id: int
    slots: List[TimetableSlotCreate]

    class Config:
        orm_mode = True