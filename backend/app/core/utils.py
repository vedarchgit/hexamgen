
from pypdf import PdfReader
from fastapi import UploadFile, HTTPException

async def parse_pdf(file: UploadFile) -> str:
    text_content = ""
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")
    
    try:
        file.file.seek(0)  # Reset file pointer to the beginning
        reader = PdfReader(file.file)
        for page in reader.pages:
            text_content += page.extract_text() + "\n"
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error parsing PDF: {e}")
    
    return text_content

