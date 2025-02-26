import os
from fastapi import FastAPI, Request, Response, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.interval import IntervalTrigger
from dotenv import load_dotenv
import uuid

from src.config import Config
from src.wordsearch import get_word_search_config
from src.weave import get_weave_config


load_dotenv()


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://178.232.190.235:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

API_SECRET_KEY = os.getenv("API_SECRET_KEY")
DAILY_CONFIG = None
SESSIONS = {}


def prepare_config(config) -> dict:
    pc = {}

    pc["wordSearchConfig"] = {
        "words": config.word_search_config.words,
    }

    pc["weaveConfig"] = {
        "startWord": config.weave_config.start_word,
        "targetWord": config.weave_config.target_word,
        "wordList": config.weave_config.word_list,
    }

    return pc

def update_config():
    print("Updating config")
    config = Config()

    config.word_search_config = get_word_search_config()
    config.weave_config = get_weave_config()

    global DAILY_CONFIG
    DAILY_CONFIG = config
    print("Config updated")


scheduler = BackgroundScheduler()
scheduler.add_job(
    update_config,
    trigger=IntervalTrigger(hours=1),
)


@app.on_event("startup")
def initialize_config():
    print("Initializing config")
    update_config()

@app.on_event("startup")
def start_scheduler():
    print("Starting scheduler")
    scheduler.start()

@app.on_event("shutdown")
def shutdown_scheduler():
    print("Shutting down scheduler")
    scheduler.shutdown()


@app.get("/")
async def root(request: Request):
    api_key = request.headers.get("X-API-KEY")
    if api_key != API_SECRET_KEY:
        raise HTTPException(status_code=401, detail="Unauthorized")
    return None


@app.get("/session")
async def create_or_get_session(request: Request, response: Response):
    session_id = request.cookies.get("session_id")

    global SESSIONS

    # If session already exists, return it
    if session_id in SESSIONS:
        return {"session_id": session_id}

    # Otherwise, create a new session
    session_id = str(uuid.uuid4())
    response.set_cookie(key="session_id", value=session_id, httponly=True)
    SESSIONS[session_id] = {}

    print("Created new session with ID:", session_id)

    return {"session_id": session_id}


@app.get("/get_daily_config")
async def get_daily_config(request: Request):
    api_key = request.headers.get("X-API-KEY")
    if api_key != API_SECRET_KEY:
        raise HTTPException(status_code=401, detail="Unauthorized")

    session_id = request.cookies.get("session_id")

    global SESSIONS, DAILY_CONFIG
    if session_id not in SESSIONS:
        raise HTTPException(status_code=401, detail="No session found")

    pc = prepare_config(DAILY_CONFIG)
    if pc is None:
        raise HTTPException(status_code=500, detail="Internal Server Error")

    print("Sending daily config to session:", session_id, "with IP:", request.client.host)

    return pc

