from fastapi import APIRouter, Depends

from app.core.jwt_services import get_optional_current_user
from app.models.placement_model import placement_prediction
from app.schemas.model_schema import placement_data
from app.services.model_config_service import get_model_configurations
from app.services.prediction_service import save_prediction


router = APIRouter()


@router.get("/models")
async def get_prediction_models():
    """Return the safe configuration used to build dynamic prediction forms."""
    return {"models": get_model_configurations()}


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

    prediction_id, prediction_count = await save_prediction(
        user=user,
        model_name="Placement Prediction",
        route="/prediction/placement",
        inputs={"cgpa": data.cgpa, "resume_score": data.resume_score},
        result=prediction_value,
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

        "prediction_id": prediction_id,
    }
