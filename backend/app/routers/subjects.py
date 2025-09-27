from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from ..db import get_session
from ..models import Subject
from ..schemas import SubjectOut

router = APIRouter(prefix="/subjects", tags=["subjects"])

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
