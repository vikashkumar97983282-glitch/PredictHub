"""Shared persistence helpers for prediction endpoints."""

from datetime import datetime, timezone

from app.database.db_connection import db


async def save_prediction(
    *, user, model_name: str, route: str, inputs: dict, result: float
) -> tuple[str, int]:
    """Save a prediction and return its id plus the current model usage count."""
    record = {
        "user_id": str(user["_id"]) if user else None,
        "user_name": user.get("name", "User") if user else "Anonymous",
        "user_email": user.get("email", "") if user else None,
        "model": model_name,
        "title": model_name,
        "input": inputs,
        "result": result,
        "status": "Completed",
        "created_at": datetime.now(timezone.utc),
    }
    insert_result = await db.predictions.insert_one(record)

    await db.models.update_one(
        {"route": route}, {"$inc": {"prediction_count": 1}}
    )
    model = await db.models.find_one({"route": route}, {"prediction_count": 1})
    prediction_count = model.get("prediction_count", 0) if model else 0

    return str(insert_result.inserted_id), prediction_count
