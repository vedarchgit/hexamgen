import uuid
from fastapi import APIRouter, Depends, HTTPException, Query, Header
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from ..db import get_session
from ..models import Note
from ..schemas import NoteCreate, NoteOut

router = APIRouter(prefix="/notes", tags=["notes"])

def require_user_id(x_user_id: str | None):
    if not x_user_id:
        raise HTTPException(status_code=401, detail="Missing X-User-Id")
    return x_user_id

@router.get("", response_model=list[NoteOut])
async def list_notes(
    subject_id: str | None = Query(None),
    session: AsyncSession = Depends(get_session),
):
    stmt = select(Note)
    if subject_id:
        stmt = stmt.where(Note.subject_id == subject_id)
    res = await session.execute(stmt)
    rows = res.scalars().all()
    return [NoteOut(
        id=n.id, subject_id=n.subject_id, title=n.title,
        content_md=n.content_md, content_url=n.content_url, created_by=n.created_by
    ) for n in rows]

@router.post("", response_model=NoteOut)
async def create_note(
    data: NoteCreate,
    session: AsyncSession = Depends(get_session),
    x_user_id: str = Header(default=None),
):
    user_id = require_user_id(x_user_id)
    note = Note(
        id=str(uuid.uuid4()),
        subject_id=data.subject_id,
        title=data.title,
        content_md=data.content_md,
        content_url=data.content_url,
        created_by=user_id
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
