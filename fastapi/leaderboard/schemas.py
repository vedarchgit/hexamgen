from pydantic import BaseModel

class LeaderboardBase(BaseModel):
    user_id: int
    quiz_id: int
    score: float

class LeaderboardCreate(LeaderboardBase):
    pass

class LeaderboardRead(LeaderboardBase):
    id: int

    model_config = {"from_attributes": True}
