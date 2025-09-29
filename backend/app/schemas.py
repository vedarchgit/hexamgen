from pydantic import BaseModel, Field
from typing import List, Optional, Any

# Subjects
class SubjectCreate(BaseModel):
    code: str
    year: str
    name: str
    branch: str


class SubjectOut(BaseModel):
    id: str
    code: str
    year: str
    name: str
    branch: str

# Notes
class NoteCreate(BaseModel):
    subject_id: str
    title: str
    content_md: Optional[str] = None
    content_url: Optional[str] = None

class NoteOut(BaseModel):
    id: str
    subject_id: str
    title: str
    content_md: Optional[str] = None
    content_url: Optional[str] = None
    created_by: str

# Quizzes
class Question(BaseModel):
    id: str
    text: str
    choices: list[str]
    correct: Optional[int] = None  # not exposed on GET

class QuizOut(BaseModel):
    id: str
    subject_id: Optional[str] = None
    title: str
    is_daily: bool
    questions: Any

class QuizSubmitIn(BaseModel):
    quiz_id: str
    answers: dict  # {questionId: selectedIndex}

class QuizSubmitOut(BaseModel):
    score: int
    xp_awarded: int

class QuizCreate(BaseModel):
    subject_code: str
    title: str
    is_daily: bool = False
    questions: List[Question] # Reusing the Question schema

# Gamification
class GamificationOut(BaseModel):
    xp_total: int = 0
    level: int = 1
    streak: int = 0
    nextLevelXp: int = Field(100, alias="nextLevelXp")

class XPEventIn(BaseModel):
    kind: str
    amount: int
    meta: Optional[dict] = None

# Leaderboard
class LeaderboardRow(BaseModel):
    user_id: str
    xp_total: int
    rank: int

# Study Plan
class StudyPlanCreate(BaseModel):
    exam_date: str
    subjects: List[str]

from pydantic import BaseModel, Field
from typing import List, Dict, Any

class NoteCreate(BaseModel):
    title: str
    subject_code: str
    content_md: str | None = None

class NoteOut(BaseModel):
    id: str
    subject_id: str
    title: str
    content_md: str | None = None
    content_url: str | None = None
    created_by: str | None = None

class QuizQuestion(BaseModel):
    id: str
    question: str
    options: List[str]
    correct: int

class QuizCreate(BaseModel):
    subject_code: str
    title: str
    is_daily: bool = False
    questions: List[QuizQuestion]

class QuizOut(BaseModel):
    id: str
    subject_id: str
    title: str
    is_daily: bool
    questions: List[Dict[str, Any]]

class QuizSubmitIn(BaseModel):
    quiz_id: str
    answers: Dict[str, int]

class QuizSubmitOut(BaseModel):
    score: int
    xp_awarded: int

class StudyPlanCreate(BaseModel):
    exam_date: str
    subjects: List[str]

class StudyPlanOut(BaseModel):
    plan: Dict[str, Any]

class Concept(BaseModel):
    concept: str
    definition: str

class Flashcard(BaseModel):
    front: str
    back: str

class QuizQuestionGenerated(BaseModel):
    question: str
    options: List[str]
    answer: str

class StudyPlanGenerated(BaseModel):
    date: str
    topics: List[str]


