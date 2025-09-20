from sqlalchemy.orm import Session
from app.models.quiz import Quiz, QuizQuestion
from app.models.pyq import PYQFile, Question
from app.quiz.generator import generate_mcqs_from_pyq
import json

def create_quiz(db: Session, creator_id: int, title: str, pyq_file_id: int):
    pyq_file = db.query(PYQFile).filter(PYQFile.id == pyq_file_id).first()
    if not pyq_file:
        return None

    questions = db.query(Question).filter(Question.pyq_file_id == pyq_file_id).all()
    mcqs = generate_mcqs_from_pyq(questions)

    quiz = Quiz(creator_id=creator_id, title=title)
    db.add(quiz)
    db.commit()
    db.refresh(quiz)

    quiz_questions = []
    for mcq in mcqs:
        qq = QuizQuestion(
            quiz_id=quiz.id,
            question_text=mcq["question_text"],
            options=json.dumps(mcq["options"]),
            correct_option=mcq["correct_option"],
        )
        quiz_questions.append(qq)

    db.bulk_save_objects(quiz_questions)
    db.commit()
    return quiz

def get_quiz(db: Session, quiz_id: int):
    return db.query(Quiz).filter(Quiz.id == quiz_id).first()

def submit_quiz(db: Session, quiz_id: int, answers: dict, user_id: int):
    quiz = get_quiz(db, quiz_id)
    if not quiz:
        return None

    from app.leaderboard.crud import update_score_for_user

    correct_count = 0
    total = len(quiz.questions)
    for q in quiz.questions:
        user_answer = answers.get(str(q.id))
        if user_answer == q.correct_option:
            correct_count += 1

    score = int((correct_count / total) * 100)
    update_score_for_user(db, user_id, score)
    return {"score": score, "correct": correct_count, "total": total}