from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict
from datetime import datetime
from question_bank import get_questions

app = FastAPI()

origins = [
    "https://preppath.vercel.app",  # React app
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------- Request Models --------

class SkillLevel(BaseModel):
    dsa: str
    aptitude: str
    hr: str

class RoadmapRequest(BaseModel):
    targetCompany: str
    skillLevel : SkillLevel
    availableDays: int

class UpdateRoadmapRequest(BaseModel):
    topic: str
    score: int
    totalMarks: int
    previousRoadmap: List[Dict]
    
class AnswerSubmission(BaseModel):
    userId: str
    topic: str
    difficulty: str
    score: int
    totalMarks: int

class AdaptiveQuestionRequest(BaseModel):
    userId: str
    topic: str
    company: str
    count: int
    performanceHistory: list


@app.post("/get-adaptive-questions")
def get_adaptive_questions(request: AdaptiveQuestionRequest):

    difficulty = get_next_difficulty(request.userId, request.topic)

    questions = get_questions(
        topic=request.topic,
        company=request.company,
        difficulty=difficulty,
        count=request.count
    )

    return {
        "difficultyLevel": difficulty,
        "questions": questions
    }
    
    

# -------- Dummy Company Data --------

company_weightage = {
    "TCS": {"aptitude": 40, "dsa": 30, "hr": 30},
    "Infosys": {"aptitude": 35, "dsa": 35, "hr": 30},
    "Accenture": {"aptitude": 30, "dsa": 40, "hr": 30},
    "Capgemini": {"aptitude": 45, "dsa": 35, "hr": 20},
    "Deloitte": {"aptitude": 30, "dsa": 40, "hr": 30},
    "EY": {"aptitude": 35, "dsa": 35, "hr": 30},
    "PwC": {"aptitude": 30, "dsa": 40, "hr": 30},
    "KPMG": {"aptitude": 35, "dsa": 35, "hr": 30},
}
# -------- Routes --------

@app.post("/generate-roadmap")
def generate_roadmap(request: RoadmapRequest):

    total_days = request.availableDays

    # Distribution
    aptitude_days = int(total_days * 0.3)
    dsa_days = int(total_days * 0.5)
    hr_days = total_days - (aptitude_days + dsa_days)

    roadmap = []
    day = 1

    # helper
    def get_type(level):
        if level == "beginner":
            return "learning"
        elif level == "intermediate":
            return "practice"
        else:
            return "mock"

    # APTITUDE
    for _ in range(aptitude_days):
        roadmap.append({
            "day": day,
            "topic": "Aptitude Practice",
            "type": get_type(request.skillLevel.aptitude),
            "status": "pending"
        })
        day += 1

    # DSA
    for _ in range(dsa_days):
        roadmap.append({
            "day": day,
            "topic": "DSA Practice",
            "type": get_type(request.skillLevel.dsa),
            "status": "pending"
        })
        day += 1

    # HR
    for _ in range(hr_days):
        roadmap.append({
            "day": day,
            "topic": "HR & Communication",
            "type": get_type(request.skillLevel.hr),
            "status": "pending"
        })
        day += 1

    return {
        "company": request.targetCompany,
        "totalDays": total_days,
        "skillLevel": request.skillLevel.dict(),
        "roadmap": roadmap
    }
# ================================
# 📌 UPDATE ROADMAP AFTER ASSESSMENT
# ================================


@app.put("/update-status")
def update_status(day: int, status: str):
    global roadmap

    for item in roadmap:
        if item["day"] == day:
            item["status"] = status
            return {"message": "Status updated successfully"}

    return {"message": "Day not found"}




@app.post("/update-roadmap")
def update_roadmap(request: UpdateRoadmapRequest):

    percentage = (request.score / request.totalMarks) * 100
    weak_areas = []

    if percentage < 50:
        weak_areas.append(request.topic)

        # Add 3 more practice days
        extra_days = []
        last_day = request.previousRoadmap[-1]["day"]

        for i in range(1, 4):
            extra_days.append({
                "day": last_day + i,
                "topic": f"{request.topic} - Reinforcement",
                "type": "practice"
            })

        updated_roadmap = request.previousRoadmap + extra_days

    else:
        updated_roadmap = request.previousRoadmap

    return {
        "updatedRoadmap": updated_roadmap,
        "weakAreas": weak_areas
    }
    
user_history = {}



@app.post("/submit-answer")
def submit_answer(request: AnswerSubmission):

    percentage = (request.score / request.totalMarks) * 100

    if request.userId not in user_history:
        user_history[request.userId] = []

    user_history[request.userId].append({
        "topic": request.topic,
        "difficulty": request.difficulty,
        "percentage": percentage
    })

    return {
        "message": "Answer recorded",
        "percentage": percentage
    }

def get_next_difficulty(userId, topic):

    if userId not in user_history:
        return "easy"

    topic_history = [
        h for h in user_history[userId]
        if h["topic"] == topic
    ]

    if not topic_history:
        return "easy"

    avg_score = sum(h["percentage"] for h in topic_history) / len(topic_history)

    if avg_score < 50:
        return "easy"
    elif avg_score < 75:
        return "medium"
    else:
        return "hard"
    
