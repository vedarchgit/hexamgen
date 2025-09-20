from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_pyqs():
    return {"message": "PYQ routes placeholder"}
