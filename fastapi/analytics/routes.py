from fastapi import APIRouter

router = APIRouter(
    prefix="/analytics",
    tags=["analytics"]
)

@router.get("/")
def get_analytics():
    return {"message": "Analytics routes placeholder"}

@router.get("/report")
def get_report():
    return {"message": "Analytics report placeholder"}
