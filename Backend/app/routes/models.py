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
# NUMBER HELPERS
# ============================================================

def safe_int(value):
    try:
        return int(value or 0)
    except (TypeError, ValueError):
        return 0


def safe_float(value):
    try:
        return float(value or 0)
    except (TypeError, ValueError):
        return 0.0


def calculate_growth(current, previous):
    """
    Calculate percentage growth.

    Example:
        Previous = 100
        Current  = 125
        Growth   = 25%
    """

    current = safe_float(current)
    previous = safe_float(previous)

    if previous == 0:
        if current > 0:
            return 100.0

        return 0.0

    return round(
        ((current - previous) / previous) * 100,
        1,
    )


# ============================================================
# DATETIME HELPER
# ============================================================

def normalize_datetime(value):
    """
    Convert MongoDB datetime into timezone-aware UTC datetime.
    """

    if not isinstance(value, datetime):
        return None

    if value.tzinfo is None:
        return value.replace(
            tzinfo=timezone.utc
        )

    return value.astimezone(
        timezone.utc
    )


# ============================================================
# GET ALL MODELS
# ============================================================

@router.get("/models")
async def get_models():

    models = await db.models.find().to_list(
        length=None
    )

    if not models:
        return {
            "message": "No models found",
            "data": [],
        }

    for model in models:

        model["_id"] = str(
            model["_id"]
        )

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
    ).to_list(
        length=None
    )

    # --------------------------------------------------------
    # NORMALIZE MODEL DATA
    # --------------------------------------------------------

    normalized_models = []

    for model in models:

        normalized_models.append(
            {
                "title": model.get(
                    "title",
                    "Unnamed model",
                ),

                "category": model.get(
                    "category"
                ),

                "accuracy": model.get(
                    "accuracy",
                    0,
                ),

                "prediction_count": model.get(
                    "prediction_count",
                    0,
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
    ).to_list(
        length=None
    )

    # --------------------------------------------------------
    # COUNT PREDICTIONS BY MODEL
    # --------------------------------------------------------

    prediction_counts_by_model = {}

    for prediction in user_predictions:

        model_name = prediction.get(
            "model",
            "Unknown model",
        )

        prediction_counts_by_model[
            model_name
        ] = (
            prediction_counts_by_model.get(
                model_name,
                0,
            ) + 1
        )

    # --------------------------------------------------------
    # MODEL PREDICTION COUNTS
    # --------------------------------------------------------

    prediction_counts = []

    for model in models:

        model_name = model.get(
            "title",
            "Unnamed model",
        )

        count = prediction_counts_by_model.get(
            model_name,
            0,
        )

        prediction_counts.append(
            count
        )

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
            "Unnamed model",
        )

        accuracy = model.get(
            "accuracy",
            0,
        )

        if not isinstance(
            accuracy,
            (int, float),
        ):
            accuracy = 0

        predictions = prediction_counts_by_model.get(
            model_name,
            0,
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
    # ADD UNKNOWN MODELS
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
    # SORT MODELS
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

        created_at = normalize_datetime(
            created_at
        )

        if created_at:
            time_value = created_at.isoformat()
        else:
            time_value = "Recently"

        recent_activity.append(
            {
                "title": prediction.get(
                    "title",
                    "Prediction",
                ),

                "model": prediction.get(
                    "model",
                    "Unknown model",
                ),

                "result": prediction.get(
                    "result",
                    "-",
                ),

                "status": prediction.get(
                    "status",
                    "Completed",
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
                "$gte": since,
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
            (int, float),
        )
        and model["accuracy"] > 0
    ]

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
        "total_predictions": total_predictions,

        "average_accuracy": average_accuracy,

        "model_categories": model_categories,

        "success_rate": success_rate,

        "total_models": total_models,

        "active_models": active_models,

        "maintenance_models": maintenance_models,

        "coming_soon_models": coming_soon_models,

        "model_status_counts": {
            "Active": active_models,
            "Maintenance": maintenance_models,
            "Coming Soon": coming_soon_models,
        },

        "predictions_growth": 0,

        "accuracy_growth": 0,

        "model_performance": model_performance,

        "recent_activity": recent_activity,

        "chart_data": chart_data,
    }


# ============================================================
# TRENDING ANALYTICS
# ============================================================

@router.get("/trending")
async def get_trending():

    # ========================================================
    # DATE RANGES
    # ========================================================

    now = datetime.now(timezone.utc)

    current_start = (
        now - timedelta(days=30)
    )

    previous_start = (
        now - timedelta(days=60)
    )

    # ========================================================
    # GET PREDICTIONS
    # ========================================================

    all_predictions = await db.predictions.find(
        {
            "created_at": {
                "$gte": previous_start,
                "$lte": now,
            }
        },
        {
            "user_id": 1,
            "model": 1,
            "title": 1,
            "created_at": 1,
        },
    ).to_list(
        length=None
    )

    # ========================================================
    # SPLIT CURRENT / PREVIOUS
    # ========================================================

    current_predictions = []
    previous_predictions = []

    for prediction in all_predictions:

        created_at = normalize_datetime(
            prediction.get("created_at")
        )

        if not created_at:
            continue

        if created_at >= current_start:

            current_predictions.append(
                prediction
            )

        elif created_at >= previous_start:

            previous_predictions.append(
                prediction
            )

    # ========================================================
    # TOTAL PREDICTIONS
    # ========================================================

    current_total = len(
        current_predictions
    )

    previous_total = len(
        previous_predictions
    )

    predictions_growth = calculate_growth(
        current_total,
        previous_total,
    )

    # ========================================================
    # ACTIVE USERS FROM USERS COLLECTION
    # ========================================================
    #
    # IMPORTANT:
    #
    # Your MongoDB users collection contains:
    #
    # role: "user"
    # active: true
    #
    # Therefore Active Users should come directly
    # from db.users instead of prediction.user_id.
    #
    # ========================================================

    active_users = await db.users.count_documents(
        {
            "role": "user",
            "active": True,
        }
    )

    # ========================================================
    # ACTIVE USER GROWTH
    # ========================================================
    #
    # Since "active" is a CURRENT account status and
    # your shown user documents do not contain historical
    # active-status timestamps, we cannot calculate
    # previous-month active-user growth accurately.
    #
    # Keep it at 0 until you add created_at / activity data.
    #
    # ========================================================

    active_users_growth = 0

    # ========================================================
    # GET MODEL INFORMATION
    # ========================================================

    model_documents = await db.models.find(
        {},
        {
            "title": 1,
            "category": 1,
            "accuracy": 1,
            "prediction_count": 1,
            "status": 1,
        },
    ).to_list(
        length=None
    )

    model_lookup = {}

    for model in model_documents:

        model_title = model.get(
            "title"
        )

        if not model_title:
            continue

        model_lookup[
            str(model_title).strip().lower()
        ] = model

    # ========================================================
    # MODEL STATISTICS
    # ========================================================

    current_model_counts = {}
    previous_model_counts = {}

    current_model_users = {}

    # ========================================================
    # CURRENT MODELS
    # ========================================================

    for prediction in current_predictions:

        model_name = prediction.get(
            "model"
        )

        if not model_name:
            continue

        model_name = str(
            model_name
        ).strip()

        model_key = model_name.lower()

        current_model_counts[
            model_key
        ] = (
            current_model_counts.get(
                model_key,
                0,
            ) + 1
        )

        if model_key not in current_model_users:

            current_model_users[
                model_key
            ] = set()

        user_id = prediction.get(
            "user_id"
        )

        if user_id:

            current_model_users[
                model_key
            ].add(
                str(user_id)
            )

    # ========================================================
    # PREVIOUS MODELS
    # ========================================================

    for prediction in previous_predictions:

        model_name = prediction.get(
            "model"
        )

        if not model_name:
            continue

        model_name = str(
            model_name
        ).strip()

        model_key = model_name.lower()

        previous_model_counts[
            model_key
        ] = (
            previous_model_counts.get(
                model_key,
                0,
            ) + 1
        )

    # ========================================================
    # BUILD TRENDING MODELS
    # ========================================================

    trending_models = []

    for model_key, count in sorted(
        current_model_counts.items(),
        key=lambda item: item[1],
        reverse=True,
    ):

        display_name = model_key

        for prediction in current_predictions:

            prediction_model = prediction.get(
                "model"
            )

            if (
                prediction_model
                and str(
                    prediction_model
                ).strip().lower()
                == model_key
            ):

                display_name = str(
                    prediction_model
                ).strip()

                break

        model_info = model_lookup.get(
            model_key,
            {}
        )

        category = model_info.get(
            "category"
        ) or "Machine Learning"

        accuracy = safe_float(
            model_info.get(
                "accuracy",
                0,
            )
        )

        previous_count = previous_model_counts.get(
            model_key,
            0,
        )

        growth = calculate_growth(
            count,
            previous_count,
        )

        users_count = len(
            current_model_users.get(
                model_key,
                set(),
            )
        )

        trending_models.append(
            {
                "rank": len(
                    trending_models
                ) + 1,

                "name": display_name,

                "category": category,

                "accuracy": round(
                    accuracy,
                    1,
                ),

                "predictions": count,

                "growth": growth,

                "users": users_count,
            }
        )

        if len(trending_models) >= 4:
            break

    # ========================================================
    # POPULAR MODEL
    # ========================================================

    if trending_models:

        popular_model = trending_models[0]

        popular_model_name = popular_model[
            "name"
        ]

        popular_model_accuracy = popular_model[
            "accuracy"
        ]

    else:

        popular_model_name = "No data"

        popular_model_accuracy = 0

    # ========================================================
    # PROJECT STATISTICS
    # ========================================================

    current_project_counts = {}
    previous_project_counts = {}

    current_project_users = {}

    for prediction in current_predictions:

        project_name = (
            prediction.get("title")
            or prediction.get("model")
            or "Prediction"
        )

        project_name = str(
            project_name
        ).strip()

        project_key = project_name.lower()

        current_project_counts[
            project_key
        ] = (
            current_project_counts.get(
                project_key,
                0,
            ) + 1
        )

        if project_key not in current_project_users:

            current_project_users[
                project_key
            ] = set()

        user_id = prediction.get(
            "user_id"
        )

        if user_id:

            current_project_users[
                project_key
            ].add(
                str(user_id)
            )

    for prediction in previous_predictions:

        project_name = (
            prediction.get("title")
            or prediction.get("model")
            or "Prediction"
        )

        project_name = str(
            project_name
        ).strip()

        project_key = project_name.lower()

        previous_project_counts[
            project_key
        ] = (
            previous_project_counts.get(
                project_key,
                0,
            ) + 1
        )

    # ========================================================
    # BUILD TRENDING PROJECTS
    # ========================================================

    trending_projects = []

    for project_key, count in sorted(
        current_project_counts.items(),
        key=lambda item: item[1],
        reverse=True,
    ):

        display_title = project_key

        for prediction in current_predictions:

            project_name = (
                prediction.get("title")
                or prediction.get("model")
            )

            if (
                project_name
                and str(
                    project_name
                ).strip().lower()
                == project_key
            ):

                display_title = str(
                    project_name
                ).strip()

                break

        model_info = model_lookup.get(
            project_key,
            {}
        )

        category = model_info.get(
            "category"
        ) or "Machine Learning"

        accuracy = safe_float(
            model_info.get(
                "accuracy",
                0,
            )
        )

        previous_count = previous_project_counts.get(
            project_key,
            0,
        )

        growth = calculate_growth(
            count,
            previous_count,
        )

        users_count = len(
            current_project_users.get(
                project_key,
                set(),
            )
        )

        trending_projects.append(
            {
                "title": display_title,

                "category": category,

                "accuracy": round(
                    accuracy,
                    1,
                ),

                "predictions": count,

                "growth": growth,

                "users": users_count,
            }
        )

        if len(trending_projects) >= 4:
            break

    # ========================================================
    # CATEGORY STATISTICS
    # ========================================================

    current_category_counts = {}
    previous_category_counts = {}

    # --------------------------------------------------------
    # MODEL -> CATEGORY MAP
    # --------------------------------------------------------

    model_category_map = {}

    for model in model_documents:

        title = model.get(
            "title"
        )

        category = model.get(
            "category"
        )

        if title:

            model_category_map[
                str(title).strip().lower()
            ] = (
                category or "Machine Learning"
            )

    # --------------------------------------------------------
    # CURRENT CATEGORY COUNTS
    # --------------------------------------------------------

    for prediction in current_predictions:

        model_name = prediction.get(
            "model"
        )

        if not model_name:
            continue

        model_key = str(
            model_name
        ).strip().lower()

        category = model_category_map.get(
            model_key,
            "Machine Learning"
        )

        current_category_counts[
            category
        ] = (
            current_category_counts.get(
                category,
                0,
            ) + 1
        )

    # --------------------------------------------------------
    # PREVIOUS CATEGORY COUNTS
    # --------------------------------------------------------

    for prediction in previous_predictions:

        model_name = prediction.get(
            "model"
        )

        if not model_name:
            continue

        model_key = str(
            model_name
        ).strip().lower()

        category = model_category_map.get(
            model_key,
            "Machine Learning"
        )

        previous_category_counts[
            category
        ] = (
            previous_category_counts.get(
                category,
                0,
            ) + 1
        )

    # ========================================================
    # BUILD CATEGORIES
    # ========================================================

    categories = []

    for category_name, count in sorted(
        current_category_counts.items(),
        key=lambda item: item[1],
        reverse=True,
    ):

        previous_count = previous_category_counts.get(
            category_name,
            0,
        )

        growth = calculate_growth(
            count,
            previous_count,
        )

        categories.append(
            {
                "name": category_name,

                "predictions": count,

                "growth": growth,
            }
        )

        if len(categories) >= 4:
            break

    # ========================================================
    # 30 DAY ACTIVITY CHART
    # ========================================================

    daily_counts = {}

    for day in range(30):

        date_value = (
            current_start
            + timedelta(days=day)
        ).date()

        daily_counts[
            date_value.isoformat()
        ] = 0

    for prediction in current_predictions:

        created_at = normalize_datetime(
            prediction.get("created_at")
        )

        if not created_at:
            continue

        date_key = created_at.date().isoformat()

        if date_key in daily_counts:

            daily_counts[
                date_key
            ] += 1

    activity_chart = list(
        daily_counts.values()
    )

    # ========================================================
    # FINAL RESPONSE
    # ========================================================

    return {

        "message": (
            "Trending analytics retrieved successfully"
        ),

        "overview": {

            "trending_predictions": current_total,

            "trending_predictions_growth": (
                predictions_growth
            ),

            # IMPORTANT:
            # This now comes from users collection
            # where role=user and active=true.
            "active_users": active_users,

            "active_users_growth": (
                active_users_growth
            ),

            "popular_model": (
                popular_model_name
            ),

            "popular_model_accuracy": round(
                popular_model_accuracy,
                1,
            ),

            "overall_growth": (
                predictions_growth
            ),
        },

        "trending_models": (
            trending_models
        ),

        "trending_projects": (
            trending_projects
        ),

        "categories": (
            categories
        ),

        "activity_chart": (
            activity_chart
        ),
    }