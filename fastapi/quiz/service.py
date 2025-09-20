import google.generativeai as genai
from core.config import settings
from sqlalchemy.orm import Session
from . import models, schemas
from auth.models import User
from pyq.models import PYQ
import json

genai.configure(api_key=settings.GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-pro') # Or 'gemini-flash'

def generate_mcq_with_gemini(question_text: str):
    prompt = f"""Generate a multiple-choice question based on the following text: '{question_text}'. Provide 4 options and indicate the correct answer.
    The output should be in a JSON format like this:
    {{
        "question": "What is the capital of France?",
        "options": [
            {{"id": "A", "text": "Berlin"}},
            {{"id": "B", "text": "Madrid"}},
            {{"id": "C", "text": "Paris"}},
            {{"id": "D", "text": "Rome"}}
        ],
        "correct_option_id": "C"
    }}
    """
    response = model.generate_content(prompt)
    return response.text

def create_quiz(db: Session, quiz: schemas.QuizCreate, user: User):
    db_quiz = models.Quiz(title=quiz.title, created_by_id=user.id)
    db.add(db_quiz)
    db.flush() # Use flush to get db_quiz.id before commit

    pyqs = db.query(PYQ).filter(PYQ.id.in_(quiz.pyq_ids)).all()

    for pyq in pyqs:
        # Generate MCQ using Gemini Flash
        gemini_response_text = generate_mcq_with_gemini(pyq.question_text)
        
        # Parse the JSON response
        try:
            mcq_data = json.loads(gemini_response_text)
        except json.JSONDecodeError:
            print(f"Error decoding JSON from Gemini Flash: {gemini_response_text}")
            continue # Skip this PYQ if response is not valid JSON

        # Create QuizQuestion
        db_question = models.QuizQuestion(
            quiz_id=db_quiz.id,
            pyq_id=pyq.id,
            question_text=mcq_data["question"],
            correct_option_id=mcq_data["correct_option_id"]
        )
        db.add(db_question)
        db.flush() # Use flush to get db_question.id before commit

        # Create QuizOptions
        for option_data in mcq_data["options"]:
            db_option = models.QuizOption(
                id=option_data["id"],
                question_id=db_question.id,
                option_text=option_data["text"]
            )
            db.add(db_option)
        
    db.commit()
    db.refresh(db_quiz)
    return db_quiz

def get_quiz(db: Session, quiz_id: int):
    return db.query(models.Quiz).filter(models.Quiz.id == quiz_id).first()

def calculate_score(db: Session, quiz_id: int, submission: schemas.QuizSubmit, user: User) -> float:
    """
    Placeholder for calculating the score.
    This would involve comparing the submitted answers with the correct answers.
    """
    # For now, let's return a dummy score.
    return 85.5
