from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from ..db import get_session
from ..models import Subject
from ..schemas import SubjectOut, SubjectCreate
import uuid

router = APIRouter(prefix="/subjects", tags=["subjects"])

@router.post("", response_model=SubjectOut)
async def create_subject(
    data: SubjectCreate,
    session: AsyncSession = Depends(get_session),
):
    subject = Subject(
        id=str(uuid.uuid4()),
        **data.model_dump()
    )
    session.add(subject)
    await session.commit()
    await session.refresh(subject)
    return subject

@router.get("", response_model=list[SubjectOut])
async def list_subjects(
    year: str | None = Query(None),
    branch: str | None = Query(None),
    session: AsyncSession = Depends(get_session),
):
    stmt = select(Subject)
    if year:
        stmt = stmt.where(Subject.year == year)
    if branch:
        stmt = stmt.where(Subject.branch == branch)
    res = await session.execute(stmt)
    rows = res.scalars().all()
    return [SubjectOut(**{
        "id": s.id, "code": s.code, "year": s.year, "name": s.name, "branch": s.branch
    }) for s in rows]
