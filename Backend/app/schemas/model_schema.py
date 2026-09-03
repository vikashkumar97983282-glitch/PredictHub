from pydantic import BaseModel



class AddModelSchema(BaseModel):
    model_title: str
    model_description: str
    model_category: str
    model_icon: str
    model_icon_color: str
    model_icon_background: str
    model_background_color: str
    model_status: str
    model_routes: str
    model_types: str
    model_version: str
    model_tags: list[str]
    

class placement_data(BaseModel):
    cgpa: float 
    resume_score: float
