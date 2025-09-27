import uuid
from fastapi import APIRouter, Depends, HTTPException, Query, Header
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, desc
from ..db import get_session
from ..models import Quiz, QuizAttempt, XPEvent, UserTotals
from ..schemas import QuizOut, QuizSubmitIn, QuizSubmitOut

router = APIRouter(prefix="/quizzes", tags=["quizzes"])

def require_user_id(x_user_id: str | None):
    if not x_user_id:
        raise HTTPException(status_code=401, detail="Missing X-User-Id")
    return x_user_id

@router.get("/daily", response_model=QuizOut | None)
async def get_daily_quiz(
    subject_id: str | None = Query(None),
    session: AsyncSession = Depends(get_session),
):
    stmt = select(Quiz).where(Quiz.is_daily == True).order_by(desc(Quiz.created_at)).limit(1)
    if subject_id:
        stmt = select(Quiz).where(Quiz.is_daily == True, Quiz.subject_id == subject_id).order_by(desc(Quiz.created_at)).limit(1)
    res = await session.execute(stmt)
    q = res.scalar_one_or_none()
    if not q:
        return None
    # strip answers.correct in response if present
    return QuizOut(id=q.id, subject_id=q.subject_id, title=q.title, is_daily=q.is_daily, questions=q.questions)

@router.post("/submit", response_model=QuizSubmitOut)
async def submit_quiz(
    payload: QuizSubmitIn,
    session: AsyncSession = Depends(get_session),
    x_user_id: str = Header(default=None),
):
    user_id = require_user_id(x_user_id)

    # fetch quiz and compute score
    res = await session.execute(select(Quiz).where(Quiz.id == payload.quiz_id))
    quiz = res.scalar_one_or_none()
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")

    score = 0
    if isinstance(quiz.questions, list):
        for q in quiz.questions:
            qid = q.get("id")
            correct = q.get("correct")
            sel = payload.answers.get(qid)
            if correct is not None and sel == correct:
                score += 1

    attempt = QuizAttempt(
        id=str(uuid.uuid4()),
        quiz_id=quiz.id,
        user_id=user_id,
        score=score,
        answers=payload.answers,
    )
    session.add(attempt)

    # simple XP: 10 per correct
    xp_awarded = score * 10
    session.add(XPEvent(id=str(uuid.uuid4()), user_id=user_id, kind="quiz_attempt", amount=xp_awarded, meta={"quiz_id": quiz.id}))

    # upsert into user_totals
    totals = (await session.execute(select(UserTotals).where(UserTotals.user_id == user_id))).scalar_one_or_none()
    if not totals:
        totals = UserTotals(user_id=user_id, xp_total=xp_awarded, level=1, streak=0)
        session.add(totals)
    else:
        totals.xp_total += xp_awarded

        # leveling: level up every 100 XP
        while totals.xp_total >= totals.level * 100:
            totals.level += 1

    await session.commit()
    return QuizSubmitOut(score=score, xp_awarded=xp_awarded)
