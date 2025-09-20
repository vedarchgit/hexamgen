from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
from typing import List
from core.db import get_db
from core.security import get_current_user
from auth.models import User
from . import schemas, service

router = APIRouter(prefix="/pyq", tags=["pyq"])

@router.post("/upload")
def upload_pyq_file(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """
    Placeholder for uploading and processing a PYQ file (CSV/PDF).
    """
    print(f"Received content type: {file.content_type}")
    if file.content_type not in ["text/csv", "application/pdf"]:
        raise HTTPException(status_code=400, detail="Invalid file type. Only CSV and PDF are supported.")
    
    # Placeholder for parsing logic
    service.parse_and_store_pyq(db, file)

    return {"message": f"File '{file.filename}' uploaded and is being processed."}

@router.get("/", response_model=List[schemas.PYQRead])
def get_pyqs(
    subject: str = None,
    year: int = None,
    topic: str = None,
    db: Session = Depends(get_db)
):
    """
    Retrieve PYQs, with optional filtering by subject, year, and topic.
    """
    pyqs = service.get_pyqs(db, subject=subject, year=year, topic=topic)
    return pyqs
