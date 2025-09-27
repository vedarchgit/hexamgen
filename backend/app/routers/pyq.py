from fastapi import APIRouter, Depends, Query, UploadFile, File, Form, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from ..db import get_session
from ..models import PYQ, Subject
from ..core.config import settings
import uuid
import shutil
router = APIRouter(prefix="/pyq", tags=["pyq"])

@router.post("/upload-pyq")
async def upload_pyq(
    subject_code: str = Form(...),
    exam_year: int = Form(...),
    term: str | None = Form(None),
    file: UploadFile = File(...), # File is required
    session: AsyncSession = Depends(get_session),
):
    # Find the subject_id based on the subject_code
    subject_res = await session.execute(select(Subject.id).where(Subject.code == subject_code))
    subject_id = subject_res.scalar_one_or_none()
    if not subject_id:
        raise HTTPException(status_code=404, detail=f"Subject with code '{subject_code}' not found")

    # Save the file
    file_extension = file.filename.split(".")[-1]
    if file_extension.lower() not in ["pdf"]:
        raise HTTPException(status_code=400, detail="Only PDF files are allowed.")

    file_uuid = uuid.uuid4()
    file_path = settings.uploads_dir / f"pyq_{file_uuid}.{file_extension}"
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # Placeholder for PDF parsing logic
    question_text = f"Content from {file.filename} (parsing not yet implemented)"
    topics = ["placeholder", "parsing"]
    difficulty = 0

    pyq = PYQ(
        id=str(uuid.uuid4()),
        subject_id=subject_id,
        exam_year=exam_year,
        term=term,
        question_text=question_text,
        topics=topics,
        difficulty=difficulty,
    )
    session.add(pyq)
    await session.commit()
    await session.refresh(pyq)

    return {"message": "PYQ uploaded successfully", "pyq_id": pyq.id, "file_path": str(file_path)}

@router.get("/{subject_id}")
async def list_pyq(subject_id: str, session: AsyncSession = Depends(get_session)):
    res = await session.execute(select(PYQ).where(PYQ.subject_id == subject_id))
    rows = res.scalars().all()
    return [{"id": r.id, "subject_id": r.subject_id, "exam_year": r.exam_year, "term": r.term, "question_text": r.question_text, "topics": r.topics, "difficulty": r.difficulty} for r in rows]

@router.get("/analyze")
async def analyze(session: AsyncSession = Depends(get_session)):
    # counts by topic across all subjects
    # For MariaDB JSON, we assume topics is stored as JSON array; simple aggregate not trivial—return placeholder
    return {"status": "ok", "message": "Implement topic frequency aggregation as needed"}
