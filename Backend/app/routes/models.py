from fastapi import APIRouter
from app.models.placement_model import placement_prediction
from app.schemas.model_schema import placement_data



router = APIRouter()



@router.post('/')
def model(data: placement_data):
    prediction = placement_prediction(data)
    return {
        "message": "this is model routes for prediction",
        "data": f" {prediction} %" 
    }