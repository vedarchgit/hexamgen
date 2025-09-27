from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from ..db import get_session
from ..models import HeatmapTopic

router = APIRouter(prefix="/heatmap", tags=["heatmap"])

@router.get("")
async def get_heatmap(subject_id: str, session: AsyncSession = Depends(get_session)):
    res = await session.execute(select(HeatmapTopic).where(HeatmapTopic.subject_id == subject_id))
    rows = res.scalars().all()
    return [{"topic": r.topic, "intensity": r.intensity} for r in rows]
