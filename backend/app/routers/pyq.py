from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from ..db import get_session
from ..models import PYQ

router = APIRouter(prefix="/pyq", tags=["pyq"])

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
