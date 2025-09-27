from pydantic import BaseModel
import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent.parent # This should point to hexamgen-frontendx/

class Settings(BaseModel):
    app_name: str = "HexamGen API"
    api_v1_prefix: str = "/api"
    cors_origins: list[str] = [
        os.getenv("FRONTEND_ORIGIN", "http://localhost:3000")
    ]
    database_url: str = os.getenv(
        "DATABASE_URL",
        "mysql+asyncmy://hexamgen:hexamgen@localhost:3306/hexamgen?charset=utf8mb4",
    )
    uploads_dir: Path = BASE_DIR / "uploads"

settings = Settings()
