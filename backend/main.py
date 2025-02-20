import os
from fastapi import FastAPI, Request, Response, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import uuid

load_dotenv()

app = FastAPI()

API_SECRET_KEY = os.getenv("API_SECRET_KEY")
COUNTERS = {}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://178.232.190.235:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root(request: Request):
    api_key = request.headers.get("X-API-KEY")
    if api_key != API_SECRET_KEY:
        raise HTTPException(status_code=401, detail="Unauthorized")
    return None


@app.get("/session")
async def create_or_get_session(request: Request, response: Response):
    session_id = request.cookies.get("session_id")

    global COUNTERS

    # If session already exists, return it
    if session_id in COUNTERS:
        return {"session_id": session_id}

    # Otherwise, create a new session
    session_id = str(uuid.uuid4())
    response.set_cookie(key="session_id", value=session_id, httponly=True)
    COUNTERS[session_id] = 0

    return {"session_id": session_id}


@app.get("/count")
async def get_count(request: Request):
    api_key = request.headers.get("X-API-KEY")
    if api_key != API_SECRET_KEY:
        raise HTTPException(status_code=401, detail="Unauthorized")

    session_id = request.cookies.get("session_id")
    print("session_id", session_id)

    global COUNTERS
    if session_id not in COUNTERS:
        return {"error": "No session found. Please refresh the page."}

    count = COUNTERS[session_id]
    COUNTERS[session_id] += 1

    return {"count": count}

