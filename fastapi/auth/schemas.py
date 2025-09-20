from pydantic import BaseModel

class UserCreate(BaseModel):
    username: str
    email: str
    password: str

class UserRead(BaseModel):
    id: int
    username: str
    email: str

    model_config = {"from_attributes": True}

# Alias for legacy code
UserOut = UserRead
