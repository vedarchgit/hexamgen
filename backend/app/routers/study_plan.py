
from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from ..schemas import StudyPlanCreate, StudyPlanOut
from ..services.gemini_service import gemini_service
from ..core.utils import parse_pdf
from .quizzes import require_user_id

router = APIRouter(
    prefix="/study-plan",
    tags=["study-plan"],
)

@router.post("/generate-study-plan-gemini")
async def generate_study_plan_with_gemini(
    file: UploadFile = File(...),
    exam_date: str = Form(...),
    x_user_id: str = Depends(require_user_id),
):
    text_content = await parse_pdf(file)
    print(f"Extracted study plan text: {text_content[:500]}...") # Log first 500 chars for debugging

    study_plan = await gemini_service.generate_study_plan(text_content, exam_date)
    return {"study_plan": study_plan}

@router.post("/", response_model=StudyPlanOut)
async def create_study_plan(study_plan_data: StudyPlanCreate, x_user_id: str = Depends(require_user_id)):
    """
    Generates a study plan based on exam date and subjects.
    """
    # In a real implementation, you would parse the exam_date,
    # look up the subjects, and generate a structured plan.
    plan = await gemini_service.generate_study_plan(
        f"Subjects: {', '.join(study_plan_data.subjects)}", 
        study_plan_data.exam_date
    )
    return StudyPlanOut(plan=plan)

