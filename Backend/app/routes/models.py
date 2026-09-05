from datetime import datetime, timedelta, timezone

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


@router.get("/analytics")
async def get_user_analytics():
    models = await db.models.find(
        {},
        {"title": 1, "accuracy": 1, "prediction_count": 1, "status": 1},
    ).to_list(length=None)

    total_predictions = await db.predictions.count_documents({})
    completed_predictions = await db.predictions.count_documents({
        "status": {"$in": ["completed", "Completed"]}
    })
    prediction_counts = [max(model.get("prediction_count", 0), 0) for model in models]
    total_model_predictions = sum(prediction_counts)

    model_performance = [
        {
            "name": model.get("title", "Unnamed model"),
            "accuracy": model.get("accuracy", 0),
            "predictions": max(model.get("prediction_count", 0), 0),
            "trend": 0,
            "status": model.get("status", "Inactive"),
        }
        for model in models
    ]
    model_performance.sort(key=lambda model: model["predictions"], reverse=True)

    recent_predictions = await db.predictions.find(
        {},
        {"title": 1, "model": 1, "result": 1, "status": 1, "created_at": 1},
    ).sort("created_at", -1).limit(10).to_list(length=10)
    recent_activity = [
        {
            "title": prediction.get("title", "Prediction"),
            "model": prediction.get("model", "Unknown model"),
            "result": prediction.get("result", "-"),
            "status": prediction.get("status", "Completed"),
            "time": prediction.get("created_at", "").isoformat()
            if isinstance(prediction.get("created_at"), datetime) else "Recently",
        }
        for prediction in recent_predictions
    ]

    since = datetime.now(timezone.utc) - timedelta(days=30)
    recent_count = await db.predictions.count_documents({"created_at": {"$gte": since}})
    chart_data = [recent_count] if recent_count else []
    accuracies = [model["accuracy"] for model in model_performance if model["accuracy"]]

    return {
        "total_predictions": total_predictions or total_model_predictions,
        "average_accuracy": round(sum(accuracies) / len(accuracies), 1) if accuracies else 0,
        "active_models": sum(1 for model in models if model.get("status") == "Active"),
        "success_rate": round(completed_predictions / total_predictions * 100, 1) if total_predictions else 0,
        "predictions_growth": 0,
        "accuracy_growth": 0,
        "model_performance": model_performance,
        "recent_activity": recent_activity,
        "chart_data": chart_data,
    }