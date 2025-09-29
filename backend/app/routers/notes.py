import uuid
import shutil
from fastapi import APIRouter, Depends, HTTPException, Query, Header, UploadFile, File, Form
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from ..db import get_session
from ..models import Note, Subject
from ..schemas import NoteCreate, NoteOut
from ..core.config import settings
from ..services.gemini_service import gemini_service
from ..core.utils import parse_pdf
from .quizzes import require_user_id

router = APIRouter(prefix="/notes", tags=["notes"])


@router.post("/", response_model=NoteOut)
async def create_note(
    title: str = Form(...),
    subject_code: str = Form(...),
    content_md: str | None = Form(None),
    file: UploadFile | None = File(None),
    session: AsyncSession = Depends(get_session),
    x_user_id: str = Depends(require_user_id),
):
    # Find the subject_id based on the subject_code
    subject_res = await session.execute(select(Subject.id).where(Subject.code == subject_code))
    subject_id = subject_res.scalar_one_or_none()
    if not subject_id:
        raise HTTPException(status_code=404, detail=f"Subject with code '{subject_code}' not found")

    content_url = None
    if file:
        file_path = settings.uploads_dir / f"{uuid.uuid4()}_{file.filename}"
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        content_url = f"/uploads/{file_path.name}"

    note = Note(
        id=str(uuid.uuid4()),
        subject_id=subject_id,
        title=title,
        content_md=content_md,
        content_url=content_url,
        created_by=x_user_id
    )
    session.add(note)
    await session.commit()
    await session.refresh(note)
    return NoteOut(
        id=note.id, subject_id=note.subject_id, title=note.title,
        content_md=note.content_md, content_url=note.content_url, created_by=note.created_by
    )

@router.post("/analyze-concepts-gemini")
async def analyze_concepts_with_gemini(
    file: UploadFile = File(...),
    x_user_id: str = Depends(require_user_id),
):
    text_content = await parse_pdf(file)
    print(f"Extracted notes text for concepts: {text_content[:500]}...") # Log first 500 chars for debugging

    concepts = await gemini_service.extract_concepts(text_content)
    return {"concepts": concepts}

@router.post("/generate-flashcards-gemini")
async def generate_flashcards_with_gemini(
    file: UploadFile = File(...),
    x_user_id: str = Depends(require_user_id),
):
    text_content = await parse_pdf(file)
    print(f"Extracted notes text for flashcards: {text_content[:500]}...") # Log first 500 chars for debugging

    flashcards = await gemini_service.generate_flashcards(text_content)
    return {"flashcards": flashcards}

@router.get("/{note_id}", response_model=NoteOut)
async def get_note(note_id: str, session: AsyncSession = Depends(get_session)):
    res = await session.execute(select(Note).where(Note.id == note_id))
    note = res.scalar_one_or_none()
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    return NoteOut(
        id=note.id, subject_id=note.subject_id, title=note.title,
        content_md=note.content_md, content_url=note.content_url, created_by=note.created_by
    )
