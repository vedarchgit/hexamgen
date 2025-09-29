import pytest
import pytest_asyncio
from sqlalchemy.ext.asyncio import AsyncSession
from backend.app.db import Base, get_session, create_db_engine, create_session_local
from backend.app.main import app
from fastapi.testclient import TestClient
import nest_asyncio

nest_asyncio.apply()

DATABASE_URL = "mysql+asyncmy://hexamgen:hexamgen@localhost:3306/test_hexamgen?charset=utf8mb4"

test_engine = create_db_engine(DATABASE_URL)
TestSessionLocal = create_session_local(test_engine)

@pytest_asyncio.fixture(scope="session", autouse=True)
async def setup_database():
    async with test_engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    async with test_engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)

@pytest_asyncio.fixture
async def client():
    async def _get_test_session():
        async with TestSessionLocal() as session:
            yield session

    app.dependency_overrides[get_session] = _get_test_session
    with TestClient(app) as c:
        yield c
    app.dependency_overrides.clear()
