from pydantic import BaseModel
from typing import List, Optional

class QuestionOut(BaseModel):
    id: int
    text: str
    topic: Optional[str]
    perplexity: Optional[str]

    class Config:
        orm_mode = True

class PYQFileCreate(BaseModel):
    subject: str
    year: int

class PYQFileOut(BaseModel):
    id: int
    filename: str
    subject: str
    year: int
    questions: List[QuestionOut]

    class Config:
        orm_mode = True