from datetime import datetime, timedelta, timezone

from fastapi import APIRouter
from fastapi.params import Depends
from app.core.jwt_services import get_optional_current_user
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

@router.get("/analytics")
async def get_user_analytics(user=Depends(get_optional_current_user)):
    user_filter = {"user_id": str(user["_id"]) if user else None}
    models = await db.models.find(
        {},
        {"title": 1, "category": 1, "accuracy": 1, "prediction_count": 1, "status": 1},
    ).to_list(length=None)

    total_predictions = await db.predictions.count_documents(user_filter)
    completed_predictions = await db.predictions.count_documents({**user_filter,
        "status": {"$in": ["completed", "Completed"]}
    })
    user_predictions = await db.predictions.find(
        user_filter,
        {"model": 1},
    ).to_list(length=None)
    prediction_counts_by_model = {}
    for prediction in user_predictions:
        model_name = prediction.get("model", "Unknown model")
        prediction_counts_by_model[model_name] = prediction_counts_by_model.get(model_name, 0) + 1

    prediction_counts = [
        prediction_counts_by_model.get(model.get("title", "Unnamed model"), 0)
        for model in models
    ]
    total_model_predictions = sum(prediction_counts)

    model_performance = [
        {
            "name": model.get("title", "Unnamed model"),
            "accuracy": model.get("accuracy", 0),
            "predictions": prediction_counts_by_model.get(model.get("title", "Unnamed model"), 0),
            "trend": 0,
            "status": model.get("status", "Inactive"),
        }
        for model in models
    ]
    model_performance.sort(key=lambda model: model["predictions"], reverse=True)

    for model_name, prediction_count in prediction_counts_by_model.items():
        if not any(model["name"] == model_name for model in model_performance):
            model_performance.append({
                "name": model_name,
                "accuracy": 0,
                "predictions": prediction_count,
                "trend": 0,
                "status": "Active",
            })

    recent_predictions = await db.predictions.find(
        user_filter,
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
    recent_count = await db.predictions.count_documents({
        **user_filter,
        "created_at": {"$gte": since},
    })
    chart_data = [0] * 30
    if recent_count:
        chart_data[-1] = recent_count
    accuracies = [model["accuracy"] for model in model_performance if model["accuracy"]]
    if not total_predictions:
        accuracies = []
    categories = {
        model.get("category")
        for model in models
        if model.get("category")
    }

    return {
        "total_predictions": total_predictions,
        "average_accuracy": round(sum(accuracies) / len(accuracies), 1) if accuracies else 0,
        "active_models": sum(1 for model in models if model.get("status") == "Active"),
        "model_categories": len(categories),
        "success_rate": round(completed_predictions / total_predictions * 100, 1) if total_predictions else 0,
        "predictions_growth": 0,
        "accuracy_growth": 0,
        "model_performance": model_performance,
        "recent_activity": recent_activity,
        "chart_data": chart_data,
    }
