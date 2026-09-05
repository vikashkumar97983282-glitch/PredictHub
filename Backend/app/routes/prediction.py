from datetime import datetime, timezone

from fastapi import APIRouter, Depends

from app.core.jwt_services import get_optional_current_user
from app.database.db_connection import db
from app.models.placement_model import placement_prediction
from app.schemas.model_schema import placement_data


router = APIRouter()


@router.post("/placement")
async def create_placement_prediction(
    data: placement_data,
    user=Depends(get_optional_current_user),
):
    """Create a Placement Prediction, save history, and increment model count."""

    # =====================================================
    # RUN MODEL PREDICTION
    # =====================================================

    prediction = placement_prediction(data)

    prediction_value = round(float(prediction), 2)

    # =====================================================
    # SAVE PREDICTION HISTORY
    # =====================================================

    prediction_record = {
        "user_id": str(user["_id"]) if user else None,
        "user_name": user.get("name", "User") if user else "Anonymous",
        "user_email": user.get("email", "") if user else None,

        "model": "Placement Prediction",
        "title": "Placement Prediction",

        "input": {
            "cgpa": data.cgpa,
            "resume_score": data.resume_score,
        },

        "result": prediction_value,

        "status": "Completed",

        "created_at": datetime.now(timezone.utc),
    }

    result = await db.predictions.insert_one(
        prediction_record
    )

    # =====================================================
    # INCREMENT MODEL PREDICTION COUNT
    # =====================================================

    await db.models.update_one(
        {
            "route": "/prediction/placement"
        },
        {
            "$inc": {
                "prediction_count": 1
            }
        }
    )

    # =====================================================
    # GET UPDATED COUNT
    # =====================================================

    model = await db.models.find_one(
        {
            "route": "/prediction/placement"
        },
        {
            "prediction_count": 1
        }
    )

    prediction_count = (
        model.get("prediction_count", 0)
        if model
        else 0
    )

    # =====================================================
    # RESPONSE
    # =====================================================

    return {
        "success": True,

        "message": "Prediction completed successfully",

        "data": {
            "prediction": prediction_value,

            "prediction_count": prediction_count,

            "model": "Placement Prediction",
        },

        "prediction": prediction_value,

        "prediction_count": prediction_count,

        "prediction_id": str(
            result.inserted_id
        ),
    }