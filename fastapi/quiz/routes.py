from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_quizzes():
    return {"message": "Quiz routes placeholder"}

@router.post("/")
def create_quiz():
    return {"message": "Create quiz placeholder"}
