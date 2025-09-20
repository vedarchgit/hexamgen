from sqlalchemy.orm import Session
from fastapi import UploadFile
from . import models, schemas
import csv
import io
import spacy

# Load the spacy model
nlp = spacy.load("en_core_web_sm")

def parse_and_store_pyq(db: Session, file: UploadFile):
    """
    Parses a CSV file containing PYQs, extracts topics using spaCy,
    and stores them in the database.
    Assumes CSV has columns: subject, year, question_text
    """
    content = file.file.read()
    stream = io.StringIO(content.decode("utf-8"))
    reader = csv.DictReader(stream)

    for row in reader:
        question_text = row.get("question_text", "")
        doc = nlp(question_text)
        
        # Extract nouns and proper nouns as topics
        topics = [chunk.text for chunk in doc.noun_chunks]
        if not topics:
            topics = [token.text for token in doc if token.pos_ in ["NOUN", "PROPN"]]
        
        topic_str = ", ".join(list(set(topics))[:5]) # Get unique topics, limit to 5

        db_pyq = models.PYQ(
            subject=row.get("subject"),
            year=int(row.get("year")),
            topic=topic_str,
            question_text=question_text
        )
        db.add(db_pyq)
    
    db.commit()

def get_pyqs(db: Session, subject: str, year: int, topic: str):
    query = db.query(models.PYQ)
    if subject:
        query = query.filter(models.PYQ.subject.ilike(f"%{subject}%"))
    if year:
        query = query.filter(models.PYQ.year == year)
    if topic:
        query = query.filter(models.PYQ.topic.ilike(f"%{topic}%"))
    return query.all()
