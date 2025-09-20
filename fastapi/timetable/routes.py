from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from core.db import get_db
from core.security import get_current_user
from auth.models import User
from . import schemas, service

router = APIRouter(prefix="/timetable", tags=["timetable"])

@router.get("/{batch}", response_model=List[schemas.ClassScheduleRead])
def get_timetable_for_batch(
    batch: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return service.get_timetable_by_batch(db, batch)

@router.post("/", response_model=schemas.ClassScheduleRead)
def create_or_update_timetable_entry(
    schedule: schemas.ClassScheduleCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # This is a simplified implementation. A real one would handle updates.
    return service.create_timetable_entry(db, schedule)
