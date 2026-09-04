from fastapi import APIRouter
from fastapi.params import Depends
from app.core.jwt_services import get_current_user
from app.models.placement_model import placement_prediction
from app.schemas.model_schema import placement_data
from app.database.db_connection import db



router = APIRouter()



@router.get('/models')
async def get_models():

    models = await db.models.find().to_list(length=None)

    if not models:
        return {
            "message": "No models found",
            "data":[]
        }

    # Convert MongoDB ObjectId to string
    for model in models:
        model["_id"] = str(model["_id"])

    return {
        "message": "Models retrieved successfully",
        "data": models
    }

@router.post('/')
def model(data: placement_data):
    prediction = placement_prediction(data)
    return {
        "message": "this is model routes for prediction",
        "data": f" {prediction} %" 
    }