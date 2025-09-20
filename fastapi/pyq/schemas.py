from pydantic import BaseModel

class PYQBase(BaseModel):
    subject: str
    year: int
    topic: str
    question_text: str

class PYQCreate(PYQBase):
    pass

class PYQRead(PYQBase):
    id: int

    model_config = {"from_attributes": True}
