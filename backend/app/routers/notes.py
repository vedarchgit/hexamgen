import uuid
from fastapi import APIRouter, Depends, HTTPException, Query, Header
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from ..db import get_session
from ..models import Note
from ..schemas import NoteCreate, NoteOut

router = APIRouter(prefix="/notes", tags=["notes"])


@router.post("", response_model=NoteOut)
async def create_note(
    data: NoteCreate,
    session: AsyncSession = Depends(get_session),
    x_user_id: str | None = Header(default=None),
):
    note = Note(
        id=str(uuid.uuid4()),
        subject_id=data.subject_id,
        title=data.title,
        content_md=data.content_md,
        content_url=data.content_url,
        created_by=x_user_id
    )
    session.add(note)
    await session.commit()
    await session.refresh(note)
    return NoteOut(
        id=note.id, subject_id=note.subject_id, title=note.title,
        content_md=note.content_md, content_url=note.content_url, created_by=note.created_by
    )

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
