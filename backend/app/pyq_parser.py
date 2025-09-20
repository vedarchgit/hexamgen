# backend/app/pyq_parser.py
import re
from PyPDF2 import PdfReader

def extract_text_from_pdf(path):
    reader = PdfReader(path)
    text = []
    for p in reader.pages:
        text.append(p.extract_text() or "")
    return "\n".join(text)


def split_questions(raw_text):
    # naive split on patterns like "Q1", "1.", "Question 1"
    parts = re.split(r'\n\s*(?:Q|Question)?\s*\d+[\).\s]', raw_text)
    # drop leading non-question text
    return [p.strip() for p in parts if len(p.strip())>50]

if __name__ == "__main__":
    path = "../../data/pyqs/OS_2022_QP_MESCOE.pdf"
    raw = extract_text_from_pdf(path)
    qs = split_questions(raw)
    print(f"Found {len(qs)} question blocks")
    for i,q in enumerate(qs[:5],1):
        print("----", i, q[:200])
