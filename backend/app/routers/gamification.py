import uuid
from fastapi import APIRouter, Depends, Header, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from ..db import get_session
from ..models import UserTotals, XPEvent
from ..schemas import GamificationOut, XPEventIn

router = APIRouter(prefix="/gamification", tags=["gamification"])

def require_user_id(x_user_id: str | None):
    if not x_user_id:
        raise HTTPException(status_code=401, detail="Missing X-User-Id")
    return x_user_id

@router.get("", response_model=GamificationOut)
async def get_totals(
    session: AsyncSession = Depends(get_session),
    x_user_id: str | None = Header(default=None)
):
    user_id = require_user_id(x_user_id)
    totals = (await session.execute(select(UserTotals).where(UserTotals.user_id == user_id))).scalar_one_or_none()
    if not totals:
        return GamificationOut(xp_total=0, level=1, streak=0, nextLevelXp=100)
    next_level_xp = totals.level * 100
    return GamificationOut(xp_total=totals.xp_total, level=totals.level, streak=totals.streak, nextLevelXp=next_level_xp)

@router.post("/event")
async def log_event(
    data: XPEventIn,
    session: AsyncSession = Depends(get_session),
    x_user_id: str | None = Header(default=None)
):
    user_id = require_user_id(x_user_id)
    event = XPEvent(id=str(uuid.uuid4()), user_id=user_id, kind=data.kind, amount=data.amount, meta=data.meta)
    session.add(event)
    totals = (await session.execute(select(UserTotals).where(UserTotals.user_id == user_id))).scalar_one_or_none()
    if not totals:
        totals = UserTotals(user_id=user_id, xp_total=data.amount, level=1, streak=0)
        session.add(totals)
    else:
        totals.xp_total += data.amount
        while totals.xp_total >= totals.level * 100:
            totals.level += 1
    await session.commit()
    return {"status": "ok"}
