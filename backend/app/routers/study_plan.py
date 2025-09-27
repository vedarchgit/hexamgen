
from fastapi import APIRouter, Depends
from ..schemas import StudyPlanCreate, StudyPlanOut

router = APIRouter(
    prefix="/study-plan",
    tags=["study-plan"],
)

@router.post("/", response_model=StudyPlanOut)
async def create_study_plan(study_plan_data: StudyPlanCreate):
    """
    Generates a study plan based on exam date and subjects.
    (Currently returns a dummy plan)
    """
    # In a real implementation, you would parse the exam_date,
    # look up the subjects, and generate a structured plan.
    dummy_plan = {
        "title": "Your Personalized Study Plan",
        "exam_date": study_plan_data.exam_date,
        "plan_details": {
            "Week 1": f"Focus on {study_plan_data.subjects[0] if study_plan_data.subjects else 'your first subject'}.",
            "Week 2": f"Review {study_plan_data.subjects[0] if study_plan_data.subjects else 'your first subject'} and start {study_plan_data.subjects[1] if len(study_plan_data.subjects) > 1 else 'your second subject'}.",
            "Week 3": "Take practice quizzes and review notes.",
            "Final Week": "Final revision of all subjects."
        }
    }
    return StudyPlanOut(plan=dummy_plan)

