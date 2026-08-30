from pydantic import BaseModel



class placement_data(BaseModel):
    cgpa: float 
    resume_score: float
