from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from auth import routes as auth_routes
from pyq import routes as pyq_routes
from quiz import routes as quiz_routes
from timetable import routes as timetable_routes
from leaderboard import routes as leaderboard_routes
from analytics import routes as analytics_routes

app = FastAPI(title="HexamGen API")

origins = [
    "http://localhost",
    "http://localhost:3000",  # Assuming your frontend runs on port 3000
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include auth routes
app.include_router(auth_routes.router)
app.include_router(pyq_routes.router)
app.include_router(quiz_routes.router)
app.include_router(timetable_routes.router)
app.include_router(leaderboard_routes.router)
app.include_router(analytics_routes.router)

@app.get("/")
def root():
    return {"message": "HexamGen API is running!"}
