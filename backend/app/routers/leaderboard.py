from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc
from ..db import get_session
from ..models import UserTotals

router = APIRouter(prefix="/leaderboard", tags=["leaderboard"])

@router.get("")
async def leaderboard(session: AsyncSession = Depends(get_session)):
    res = await session.execute(select(UserTotals).order_by(desc(UserTotals.xp_total)).limit(50))
    rows = res.scalars().all()
    out = []
    rank = 1
    for r in rows:
        out.append({"user_id": r.user_id, "xp_total": r.xp_total, "rank": rank})
        rank += 1
    return out
