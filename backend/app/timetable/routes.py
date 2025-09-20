from fastapi import APIRouter, Depends, UploadFile, File, HTTPException, status
from sqlalchemy.orm import Session
from app.db.base import get_db
from app.auth.routes import oauth2_scheme
from app.auth.utils import decode_access_token
from app.timetable import crud, scheduler, schemas, google_calendar

router = APIRouter(prefix="/timetable", tags=["timetable"])

@router.post("/upload", response_model=schemas.TimetableOut)
async def upload_timetable(
    file: UploadFile = File(...),
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
):
    payload = decode_access_token(token)
    if not payload:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    uploader_email = payload.get("sub")
    from app.auth.crud import get_user_by_email
    user = get_user_by_email(db, uploader_email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    content = await file.read()

    if file.content_type in ["text/csv"]:
        slots = scheduler.parse_csv_timetable(content)
    elif file.content_type in ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel"]:
        slots = scheduler.parse_excel_timetable(content)
    else:
        raise HTTPException(status_code=400, detail="Unsupported file type")

    timetable = crud.create_timetable(db, user.id, slots)

    # Sync with Google Calendar in background (For demo, sync synchronously)
    google_calendar.sync_timetable_to_google_calendar(timetable.id, timetable.slots)

    return timetable

@router.get("/{timetable_id}", response_model=schemas.TimetableOut)
def view_timetable(timetable_id: int, db: Session = Depends(get_db)):
    timetable = crud.get_timetable(db, timetable_id)
    if not timetable:
        raise HTTPException(status_code=404, detail="Timetable not found")
    return timetable