from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase
from .core.config import settings

# Use a function to create the engine and sessionmaker so it can be configured dynamically
def create_db_engine(database_url: str):
    return create_async_engine(database_url, pool_pre_ping=True, future=True)

def create_session_local(engine):
    return async_sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)

engine = create_db_engine(settings.database_url)
SessionLocal = create_session_local(engine)

class Base(DeclarativeBase):
    pass

async def get_session() -> AsyncSession:
    async with SessionLocal() as session:
        yield session
