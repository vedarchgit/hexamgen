from sqlalchemy.orm import Session
from . import models, schemas

def get_timetable_by_batch(db: Session, batch: str):
    return db.query(models.ClassSchedule).filter(models.ClassSchedule.batch == batch).all()

def create_timetable_entry(db: Session, schedule: schemas.ClassScheduleCreate):
    db_schedule = models.ClassSchedule(**schedule.model_dump())
    db.add(db_schedule)
    db.commit()
    db.refresh(db_schedule)
    return db_schedule
