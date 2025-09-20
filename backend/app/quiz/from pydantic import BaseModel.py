from pydantic import BaseModel
from typing import List

class QuizQuestionCreate(BaseModel):
    question_text: str
    options: List[str]
    correct_option: str

class QuizCreate(BaseModel):
    title: str
    pyq_file_id: int  # generate quiz from this PYQ file

class QuizQuestionOut(BaseModel):
    id: int
    question_text: str
    options: List[str]
    correct_option: str

    class Config:
        orm_mode = True

class QuizOut(BaseModel):
    id: int
    title: str
    questions: List[QuizQuestionOut]

    class Config:
        orm_mode = True
        