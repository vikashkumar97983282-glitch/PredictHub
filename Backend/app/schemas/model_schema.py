from pydantic import BaseModel
from typing import List



class AdminModelCreate(BaseModel):
    title: str
    description: str
    category: str
    route: str
    icon: str
    model_type: str
    icon_color: str
    icon_background: str
    border_color: str
    version: str
    status: str
    prediction_count: int
    tags: List[str]


class AdminModelStatusUpdate(BaseModel):
    status: str
    

class placement_data(BaseModel):
    cgpa: float 
    resume_score: float
