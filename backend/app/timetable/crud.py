from sqlalchemy.orm import Session
from app.models.timetable import Timetable, TimetableSlot
from app.timetable.schemas import TimetableSlotCreate
from app.timetable.scheduler import auto_schedule
from typing import List

def create_timetable(db: Session, uploader_id: int, slots: List[TimetableSlotCreate]):
    timetable = Timetable(uploader_id=uploader_id)
    db.add(timetable)
    db.commit()
    db.refresh(timetable)

    scheduled_slots = auto_schedule(slots)

    slot_objs = []
    for slot in scheduled_slots:
        slot_obj = TimetableSlot(
            timetable_id=timetable.id,
            day_of_week=slot.day_of_week,
            start_time=slot.start_time,
            end_time=slot.end_time,
            subject=slot.subject,
            location=slot.location,
        )
        slot_objs.append(slot_obj)

    db.bulk_save_objects(slot_objs)
    db.commit()
    return timetable

def get_timetable(db: Session, timetable_id: int):
    return db.query(Timetable).filter(Timetable.id == timetable_id).first()