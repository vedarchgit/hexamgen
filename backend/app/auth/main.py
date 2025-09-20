from fastapi import FastAPI, File, UploadFile
import shutil
import os

app = FastAPI()

UPLOAD_DIR = "data/pyqs/"

@app.post("/upload-pyq/")
async def upload_pyq(file: UploadFile = File(...), subject: str = "Unknown", year: int = 0):
    os.makedirs(UPLOAD_DIR, exist_ok=True)
    path = os.path.join(UPLOAD_DIR, file.filename)
    with open(path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    return {"filename": file.filename, "subject": subject, "year": year}
