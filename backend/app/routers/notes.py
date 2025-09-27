import uuid
import shutil
from fastapi import APIRouter, Depends, HTTPException, Query, Header, UploadFile, File, Form
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from ..db import get_session
from ..models import Note, Subject
from ..schemas import NoteCreate, NoteOut
from ..core.config import settings

router = APIRouter(tags=["notes"])


@router.post("/notes", response_model=NoteOut)
async def create_note(
    title: str = Form(...),
    subject_code: str = Form(...),
    content_md: str | None = Form(None),
    file: UploadFile | None = File(None),
    session: AsyncSession = Depends(get_session),
    x_user_id: str | None = Header(default=None),
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

@router.get("/notes/{note_id}", response_model=NoteOut)
async def get_note(note_id: str, session: AsyncSession = Depends(get_session)):
    res = await session.execute(select(Note).where(Note.id == note_id))
    note = res.scalar_one_or_none()
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    return NoteOut(
        id=note.id, subject_id=note.subject_id, title=note.title,
        content_md=note.content_md, content_url=note.content_url, created_by=note.created_by
    )
