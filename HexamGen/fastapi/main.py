from fastapi import FastAPI
from auth import routes as auth_routes
from core.db import engine, Base

# Create database tables automatically
Base.metadata.create_all(bind=engine)

app = FastAPI(title="HexamGen API")

# Include auth routes
app.include_router(auth_routes.router)

@app.get("/")
def root():
    return {"message": "HexamGen API is running!"}
