import random
from app.models.pyq import Question
from typing import List, Dict
import json

def generate_mcqs_from_pyq(questions: List[Question], num_questions: int = 5) -> List[Dict]:
    # For demo: randomly pick questions and generate dummy MCQs with 4 options
    selected_questions = random.sample(questions, min(num_questions, len(questions)))
    mcqs = []
    for q in selected_questions:
        correct_answer = "Correct Answer"
        options = [correct_answer, "Option A", "Option B", "Option C"]
        random.shuffle(options)
        mcqs.append({
            "question_text": q.text,
            "options": options,
            "correct_option": correct_answer,
        })
    return mcqs