from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException, status
from sqlalchemy.orm import Session
from app.db.base import get_db
from app.auth.routes import oauth2_scheme
from app.auth.utils import decode_access_token
from app.pyq import crud, schemas

router = APIRouter(prefix="/pyq", tags=["pyq"])

@router.post("/upload", response_model=schemas.PYQFileOut)
async def upload_pyq(
    subject: str = Form(...),
    year: int = Form(...),
    file: UploadFile = File(...),
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
):
    payload = decode_access_token(token)
    if not payload:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    uploader_email = payload.get("sub")
    # Assuming user fetch function here
    from app.auth.crud import get_user_by_email
    user = get_user_by_email(db, uploader_email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if file.content_type not in ["application/pdf", "text/csv", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"]:
        raise HTTPException(status_code=400, detail="Unsupported file type")

    content = await file.read()
    filetype = "pdf" if file.content_type == "application/pdf" else "csv"

    pyq_file = crud.create_pyq_file(db, user.id, file.filename, subject, year, content, filetype)
    return pyq_file