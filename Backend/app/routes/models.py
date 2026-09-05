from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Depends

from app.core.jwt_services import get_optional_current_user
from app.database.db_connection import db


router = APIRouter()


# ============================================================
# STATUS HELPER
# ============================================================

def normalize_model_status(status):
    """
    Convert model status into one of the supported values:

    Active
    Maintenance
    Coming Soon
    """

    if not status:
        return "Coming Soon"

    status = str(status).strip().lower()

    status_map = {
        "active": "Active",
        "available": "Active",
        "online": "Active",

        "maintenance": "Maintenance",
        "under maintenance": "Maintenance",

        "coming soon": "Coming Soon",
        "coming_soon": "Coming Soon",
        "coming-soon": "Coming Soon",

        "inactive": "Coming Soon",
    }

    return status_map.get(status, "Coming Soon")


# ============================================================
# GET ALL MODELS
# ============================================================

@router.get("/models")
async def get_models():

    models = await db.models.find().to_list(length=None)

    if not models:
        return {
            "message": "No models found",
            "data": [],
        }

    # Convert MongoDB ObjectId to string
    for model in models:
        model["_id"] = str(model["_id"])

        # Normalize model status
        model["status"] = normalize_model_status(
            model.get("status")
        )

    return {
        "message": "Models retrieved successfully",
        "data": models,
    }


# ============================================================
# USER ANALYTICS
# ============================================================

@router.get("/analytics")
async def get_user_analytics(
    user=Depends(get_optional_current_user)
):

    # --------------------------------------------------------
    # USER FILTER
    # --------------------------------------------------------

    user_filter = {
        "user_id": str(user["_id"]) if user else None
    }

    # --------------------------------------------------------
    # GET MODELS
    # --------------------------------------------------------

    models = await db.models.find(
        {},
        {
            "title": 1,
            "category": 1,
            "accuracy": 1,
            "prediction_count": 1,
            "status": 1,
        },
    ).to_list(length=None)

    # --------------------------------------------------------
    # NORMALIZE MODEL DATA
    # --------------------------------------------------------

    normalized_models = []

    for model in models:

        normalized_models.append(
            {
                "title": model.get(
                    "title",
                    "Unnamed model"
                ),

                "category": model.get(
                    "category"
                ),

                "accuracy": model.get(
                    "accuracy",
                    0
                ),

                "prediction_count": model.get(
                    "prediction_count",
                    0
                ),

                "status": normalize_model_status(
                    model.get("status")
                ),
            }
        )

    models = normalized_models

    # --------------------------------------------------------
    # TOTAL USER PREDICTIONS
    # --------------------------------------------------------

    total_predictions = await db.predictions.count_documents(
        user_filter
    )

    # --------------------------------------------------------
    # COMPLETED USER PREDICTIONS
    # --------------------------------------------------------

    completed_predictions = await db.predictions.count_documents(
        {
            **user_filter,
            "status": {
                "$in": [
                    "completed",
                    "Completed",
                    "COMPLETED",
                ]
            },
        }
    )

    # --------------------------------------------------------
    # GET USER PREDICTIONS
    # --------------------------------------------------------

    user_predictions = await db.predictions.find(
        user_filter,
        {
            "model": 1,
        },
    ).to_list(length=None)

    # --------------------------------------------------------
    # COUNT PREDICTIONS BY MODEL
    # --------------------------------------------------------

    prediction_counts_by_model = {}

    for prediction in user_predictions:

        model_name = prediction.get(
            "model",
            "Unknown model"
        )

        prediction_counts_by_model[model_name] = (
            prediction_counts_by_model.get(
                model_name,
                0
            ) + 1
        )

    # --------------------------------------------------------
    # MODEL PREDICTION COUNTS
    # --------------------------------------------------------

    prediction_counts = []

    for model in models:

        model_name = model.get(
            "title",
            "Unnamed model"
        )

        count = prediction_counts_by_model.get(
            model_name,
            0
        )

        prediction_counts.append(count)

    total_model_predictions = sum(
        prediction_counts
    )

    # --------------------------------------------------------
    # MODEL PERFORMANCE
    # --------------------------------------------------------

    model_performance = []

    for model in models:

        model_name = model.get(
            "title",
            "Unnamed model"
        )

        accuracy = model.get(
            "accuracy",
            0
        )

        # Make sure accuracy is numeric
        if not isinstance(
            accuracy,
            (int, float)
        ):
            accuracy = 0

        predictions = prediction_counts_by_model.get(
            model_name,
            0
        )

        status = normalize_model_status(
            model.get("status")
        )

        model_performance.append(
            {
                "name": model_name,
                "accuracy": accuracy,
                "predictions": predictions,
                "trend": 0,
                "status": status,
            }
        )

    # --------------------------------------------------------
    # ADD UNKNOWN MODELS FROM USER PREDICTIONS
    # --------------------------------------------------------

    existing_model_names = {
        model["name"]
        for model in model_performance
    }

    for model_name, prediction_count in (
        prediction_counts_by_model.items()
    ):

        if model_name not in existing_model_names:

            model_performance.append(
                {
                    "name": model_name,
                    "accuracy": 0,
                    "predictions": prediction_count,
                    "trend": 0,
                    "status": "Active",
                }
            )

    # --------------------------------------------------------
    # SORT MODELS BY PREDICTIONS
    # --------------------------------------------------------

    model_performance.sort(
        key=lambda model: model["predictions"],
        reverse=True,
    )

    # --------------------------------------------------------
    # MODEL STATUS COUNTS
    # --------------------------------------------------------

    active_models = sum(
        1
        for model in models
        if model["status"] == "Active"
    )

    maintenance_models = sum(
        1
        for model in models
        if model["status"] == "Maintenance"
    )

    coming_soon_models = sum(
        1
        for model in models
        if model["status"] == "Coming Soon"
    )

    total_models = len(models)

    # --------------------------------------------------------
    # MODEL CATEGORIES
    # --------------------------------------------------------

    categories = {
        model.get("category")
        for model in models
        if model.get("category")
    }

    model_categories = len(categories)

    # --------------------------------------------------------
    # RECENT PREDICTIONS
    # --------------------------------------------------------

    recent_predictions = await db.predictions.find(
        user_filter,
        {
            "title": 1,
            "model": 1,
            "result": 1,
            "status": 1,
            "created_at": 1,
        },
    ).sort(
        "created_at",
        -1,
    ).limit(
        10
    ).to_list(
        length=10
    )

    # --------------------------------------------------------
    # RECENT ACTIVITY
    # --------------------------------------------------------

    recent_activity = []

    for prediction in recent_predictions:

        created_at = prediction.get(
            "created_at"
        )

        if isinstance(
            created_at,
            datetime
        ):
            time_value = created_at.isoformat()
        else:
            time_value = "Recently"

        recent_activity.append(
            {
                "title": prediction.get(
                    "title",
                    "Prediction"
                ),

                "model": prediction.get(
                    "model",
                    "Unknown model"
                ),

                "result": prediction.get(
                    "result",
                    "-"
                ),

                "status": prediction.get(
                    "status",
                    "Completed"
                ),

                "time": time_value,
            }
        )

    # --------------------------------------------------------
    # LAST 30 DAYS
    # --------------------------------------------------------

    since = (
        datetime.now(timezone.utc)
        - timedelta(days=30)
    )

    recent_count = await db.predictions.count_documents(
        {
            **user_filter,
            "created_at": {
                "$gte": since
            },
        }
    )

    # --------------------------------------------------------
    # CHART DATA
    # --------------------------------------------------------

    chart_data = [0] * 30

    if recent_count:
        chart_data[-1] = recent_count

    # --------------------------------------------------------
    # ACCURACY
    # --------------------------------------------------------

    accuracies = [
        model["accuracy"]
        for model in model_performance
        if isinstance(
            model["accuracy"],
            (int, float)
        )
        and model["accuracy"] > 0
    ]

    # Don't show accuracy when user has no predictions
    if total_predictions == 0:
        accuracies = []

    average_accuracy = (
        round(
            sum(accuracies)
            / len(accuracies),
            1,
        )
        if accuracies
        else 0
    )

    # --------------------------------------------------------
    # SUCCESS RATE
    # --------------------------------------------------------

    success_rate = (
        round(
            (
                completed_predictions
                / total_predictions
            ) * 100,
            1,
        )
        if total_predictions
        else 0
    )

    # --------------------------------------------------------
    # RETURN ANALYTICS
    # --------------------------------------------------------

    return {
        # -----------------------------------------------
        # BASIC ANALYTICS
        # -----------------------------------------------

        "total_predictions": total_predictions,

        "average_accuracy": average_accuracy,

        "model_categories": model_categories,

        "success_rate": success_rate,

        # -----------------------------------------------
        # MODEL COUNTS
        # -----------------------------------------------

        "total_models": total_models,

        "active_models": active_models,

        "maintenance_models": maintenance_models,

        "coming_soon_models": coming_soon_models,

        # -----------------------------------------------
        # STATUS OBJECT
        # -----------------------------------------------

        "model_status_counts": {
            "Active": active_models,
            "Maintenance": maintenance_models,
            "Coming Soon": coming_soon_models,
        },

        # -----------------------------------------------
        # GROWTH
        # -----------------------------------------------

        "predictions_growth": 0,

        "accuracy_growth": 0,

        # -----------------------------------------------
        # MODEL PERFORMANCE
        # -----------------------------------------------

        "model_performance": model_performance,

        # -----------------------------------------------
        # RECENT ACTIVITY
        # -----------------------------------------------

        "recent_activity": recent_activity,

        # -----------------------------------------------
        # CHART
        # -----------------------------------------------

        "chart_data": chart_data,
    }