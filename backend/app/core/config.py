"""1. Environment, DB setup (PostgreSQL)
app/core/config.py

Load env vars for DB, JWT, Firebase, Google API keys"""



from pydantic import BaseSettings

class Settings(BaseSettings):
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_DB: str
    POSTGRES_HOST: str = "localhost"
    POSTGRES_PORT: int = 5432

    JWT_SECRET_KEY: str
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 1 day

    FIREBASE_CREDENTIALS: str  # path to firebase json or json string
    GOOGLE_CALENDAR_API_KEY: str

    class Config:
        env_file = ".env"

settings = Settings()
