
import pytest
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import sessionmaker
from sqlalchemy import select
import pytest_asyncio

from ..app.main import app
from ..app.db import get_session, Base
from ..app.models import Subject, Quiz

# Setup a test database engine
SQLALCHEMY_DATABASE_URL = "sqlite+aiosqlite:///./test.db"
engine = create_async_engine(SQLALCHEMY_DATABASE_URL, echo=True, future=True)
TestingSessionLocal = async_sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)

@pytest_asyncio.fixture(name="session")
async def session_fixture():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    async with TestingSessionLocal() as session:
        yield session
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)

@pytest_asyncio.fixture(name="client")
async def client_fixture(session: AsyncSession):
    async def override_get_session():
        yield session
    app.dependency_overrides[get_session] = override_get_session
    async with AsyncClient(app=app, base_url="http://test") as client:
        yield client
    app.dependency_overrides.clear()

@pytest.mark.asyncio
async def test_create_quiz(client: AsyncClient, session: AsyncSession):
    # Create a dummy subject first
    test_subject = Subject(id="test-subject-id", code="TEST-SUB", year="FE", name="Test Subject", branch="Test Branch")
    session.add(test_subject)
    await session.commit()
    await session.refresh(test_subject)

    quiz_data = {
        "subject_code": "TEST-SUB",
        "title": "Test Quiz",
        "is_daily": False,
        "questions": [
            {
                "id": "q1",
                "text": "What is 1+1?",
                "choices": ["1", "2", "3", "4"],
                "correct": 1
            }
        ]
    }

    response = await client.post("/api/v1/quizzes/", json=quiz_data)

    assert response.status_code == 200
    assert response.json()["title"] == "Test Quiz"
    assert response.json()["subject_id"] == "test-subject-id"
    assert len(response.json()["questions"]) == 1

    # Verify it's in the database
    quiz_in_db = await session.execute(select(Quiz).where(Quiz.id == response.json()["id"]))
    assert quiz_in_db.scalar_one_or_none() is not None
