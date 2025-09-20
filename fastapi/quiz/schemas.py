from pydantic import BaseModel
from typing import List, Dict, Optional

class QuizOptionBase(BaseModel):
    id: str
    option_text: str

class QuizOptionRead(QuizOptionBase):
    class Config:
        from_attributes = True

class QuizQuestionBase(BaseModel):
    question_text: str
    correct_option_id: str

class QuizQuestionCreate(QuizQuestionBase):
    options: List[QuizOptionBase]

class QuizQuestionRead(QuizQuestionBase):
    id: int
    options: List[QuizOptionRead]
    pyq_id: Optional[int] = None

    class Config:
        from_attributes = True

class QuizCreate(BaseModel):
    title: str
    pyq_ids: List[int]

class QuizRead(BaseModel):
    id: int
    title: str
    questions: List[QuizQuestionRead]

    class Config:
        from_attributes = True

class Answer(BaseModel):
    answer: str

class QuizSubmit(BaseModel):
    answers: Dict[int, Answer]
