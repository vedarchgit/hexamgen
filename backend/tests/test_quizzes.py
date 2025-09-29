
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import select
from backend.app.models import Subject, Quiz
import uuid
from backend.app.db import get_session

@pytest.mark.asyncio
async def test_create_quiz(client: TestClient):
    # Get the overridden session
    session = await anext(get_session())

    # Create a dummy subject first
    test_subject = Subject(id=str(uuid.uuid4()), code="TEST-SUB", year="FE", name="Test Subject", branch="Test Branch")
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
                "question": "What is 1+1?",
                "options": ["1", "2", "3", "4"],
                "correct": 1
            }
        ]
    }

    response = client.post("/api/v1/quizzes/", json=quiz_data, headers={"x-user-id": "test-user"})

    assert response.status_code == 200
    assert response.json()["title"] == "Test Quiz"
    assert response.json()["subject_id"] == test_subject.id
    assert len(response.json()["questions"]) == 1

    # Verify it's in the database using the overridden session
    quiz_in_db = await session.execute(select(Quiz).where(Quiz.id == response.json()["id"]))
    assert quiz_in_db.scalar_one_or_none() is not None
