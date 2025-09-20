"""c) PYQ Parsing Utility (PDF/CSV)
app/pyq/parser.py"""

import csv
import io
from typing import List, Tuple
from PyPDF2 import PdfReader

def parse_pdf_questions(file_bytes: bytes) -> List[str]:
    reader = PdfReader(io.BytesIO(file_bytes))
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"
    # Simple split by line or question marks - can be improved by NLP
    questions = [q.strip() for q in text.split('\n') if len(q.strip()) > 10]
    return questions

def parse_csv_questions(file_bytes: bytes) -> List[str]:
    questions = []
    f = io.StringIO(file_bytes.decode())
    reader = csv.reader(f)
    for row in reader:
        if row:
            # Assume question text is in first column or adjust accordingly
            questions.append(row[0])
    return questions