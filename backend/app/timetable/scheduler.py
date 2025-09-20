import csv
import io
from typing import List
import pandas as pd
from app.timetable.schemas import TimetableSlotCreate

def parse_csv_timetable(file_bytes: bytes) -> List[TimetableSlotCreate]:
    f = io.StringIO(file_bytes.decode())
    reader = csv.DictReader(f)
    slots = []
    for row in reader:
        slot = TimetableSlotCreate(
            day_of_week=row.get("day_of_week"),
            start_time=row.get("start_time"),
            end_time=row.get("end_time"),
            subject=row.get("subject"),
            location=row.get("location", None)
        )
        slots.append(slot)
    return slots

def parse_excel_timetable(file_bytes: bytes) -> List[TimetableSlotCreate]:
    df = pd.read_excel(io.BytesIO(file_bytes))
    slots = []
    for _, row in df.iterrows():
        slot = TimetableSlotCreate(
            day_of_week=row.get("day_of_week"),
            start_time=str(row.get("start_time")),
            end_time=str(row.get("end_time")),
            subject=row.get("subject"),
            location=row.get("location", None)
        )
        slots.append(slot)
    return slots

def auto_schedule(slots: List[TimetableSlotCreate]) -> List[TimetableSlotCreate]:
    # Placeholder for constraint-based scheduling logic
    # For demo, return slots as is
    return slots