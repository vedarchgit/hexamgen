from pydantic_settings import BaseSettings
from typing import ClassVar

class Settings(BaseSettings):
    DATABASE_URL: str = 'postgresql+psycopg2://postgres:your_password@localhost:5432/hexamgen'
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    SECRET_KEY: str = "your_secret_key_here"

    # Not a field, static info
    APP_NAME: ClassVar[str] = "HexamGen"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

# Singleton instance
settings = Settings()
