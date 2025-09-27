from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from pydantic import BaseModel
from typing import List

from ..db import get_session
from ..core.config import settings

router = APIRouter(prefix="/status", tags=["status"])

class ComponentStatus(BaseModel):
    name: str
    status: str # e.g., "operational", "degraded", "offline"
    message: str | None = None

class SystemStatusResponse(BaseModel):
    overall_status: str
    components: List[ComponentStatus]

@router.get("/", response_model=SystemStatusResponse)
async def get_system_status(session: AsyncSession = Depends(get_session)):
    overall_status = "operational"
    components = []

    # Check Database Status
    try:
        await session.execute(text("SELECT 1"))
        components.append(ComponentStatus(name="Database", status="operational", message="Connected"))
    except Exception as e:
        overall_status = "degraded"
        components.append(ComponentStatus(name="Database", status="degraded", message=f"Connection failed: {e}"))

    # Check Gemini API Key Presence
    if settings.gemini_api_key:
        components.append(ComponentStatus(name="Gemini API", status="operational", message="API key configured"))
    else:
        overall_status = "degraded"
        components.append(ComponentStatus(name="Gemini API", status="degraded", message="API key not configured"))

    # Placeholder for Perplexity API check (if integrated later)
    # if settings.perplexity_api_key:
    #     components.append(ComponentStatus(name="Perplexity API", status="operational", message="API key configured"))
    # else:
    #     overall_status = "degraded"
    #     components.append(ComponentStatus(name="Perplexity API", status="degraded", message="API key not configured"))

    # Placeholder for n8n Automation check (if integrated later)
    # components.append(ComponentStatus(name="n8n Automation", status="unknown", message="Not yet integrated"))

    return SystemStatusResponse(overall_status=overall_status, components=components)
