from datetime import datetime, timedelta, timezone
from bson import ObjectId
from fastapi import APIRouter, Depends, HTTPException
from app.core.jwt_services import get_current_user
from app.schemas.admin_schema import (
    AdminLoginResponse,
    AdminCreate,
    AdminUpdate,
    AdminUser,
    AdminUserCreate,
)
from app.schemas.model_schema import AdminModelCreate, AdminModelStatusUpdate
from app.database.db_connection import db,collection
from app.services.hash_password import hash_password



router = APIRouter()



@router.get('/')
def home():
    return {
        'message':'this is PredictHub application from Fastapi! from admin router',

        }



@router.post('/create_admin')
async def create_admin(data: AdminCreate):
    if data.password != data.confirm_password:
        return {
            'message':'Password and confirm password do not match'
        }

    user = await collection.count_documents({})

    if user > 0:
        return {
            'message':'Admin already exists'
        }

    hashed_password = hash_password(data.password)
    
    admin = {
        "name": data.name,
        "age": data.age,
        "email": data.email.lower(),
        "password": hashed_password,
        "role": data.role,
    }

    result = await db.admin.insert_one(admin)

    return {
        "message": "Admin created successfully",
        "user_id": str(result.inserted_id),
        "role": "admin",
    }


@router.put("/update_admin")
async def update_admin(data: AdminUpdate, user=Depends(get_current_user)):

    if user.get("role", "").lower() != "admin":
        raise HTTPException(status_code=403, detail="Admin access required.")

    admin = await db.admin.find_one({"_id": user["_id"]})

    if not admin:
        raise HTTPException(status_code=404, detail="Admin not found.")

    if data.password != data.confirm_password:
        raise HTTPException(
            status_code=400,
            detail="Password and confirm password do not match"
        )

    hashed_password = hash_password(data.password)

    update_data = {
        "name": data.name,
        "password": hashed_password
    }

    result = await db.admin.update_one(
        {"_id": user["_id"]},
        {"$set": update_data}
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Admin not found.")

    return {
        "message": "Admin updated successfully"
    }


@router.post("/add_model")
async def add_model(data: AdminModelCreate, user=Depends(get_current_user)):

    model_data = data.model_dump()

    result = await db.models.insert_one(model_data)

    return {
        "message": "Model added successfully",
        "model_id": str(result.inserted_id)
    }


@router.put("/models/{model_id}")
async def update_model(model_id: str, data: AdminModelCreate, user=Depends(get_current_user)):
    if not ObjectId.is_valid(model_id):
        raise HTTPException(status_code=400, detail="Invalid model ID.")

    result = await db.models.update_one(
        {"_id": ObjectId(model_id)},
        {"$set": data.model_dump()},
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Model not found.")

    return {
        "message": "Model updated successfully",
        "model_id": model_id,
    }


@router.patch("/models/{model_id}/status")
async def update_model_status(
    model_id: str,
    data: AdminModelStatusUpdate,
    user=Depends(get_current_user)
):
    if not ObjectId.is_valid(model_id):
        raise HTTPException(
            status_code=400,
            detail="Invalid model ID."
        )

    # Allow these 3 statuses
    if data.status not in {"Active", "Maintenance", "Coming Soon"}:
        raise HTTPException(
            status_code=400,
            detail="Status must be Active, Maintenance, or Coming Soon."
        )

    result = await db.models.update_one(
        {"_id": ObjectId(model_id)},
        {"$set": {"status": data.status}},
    )

    if result.matched_count == 0:
        raise HTTPException(
            status_code=404,
            detail="Model not found."
        )

    return {
        "message": "Model status updated successfully",
        "model_id": model_id,
        "status": data.status,
    }



@router.post("/users")
async def create_user(data: AdminUserCreate, user=Depends(get_current_user)):
    email = data.email.lower().strip()

    existing_user = await db.users.find_one({"email": email})
    existing_admin = await db.admin.find_one({"email": email})
    if existing_user or existing_admin:
        raise HTTPException(status_code=409, detail="User already exists")

    role = data.role.lower().strip()
    if role not in {"user", "admin"}:
        raise HTTPException(status_code=400, detail="Role must be user or admin")

    user = {
        "name": data.name.strip(),
        "email": email,
        "password": hash_password(data.password),
        "role": role,
        "active": True,
    }
    result = await db.users.insert_one(user)

    return {
        "message": "User created successfully",
        "user": {
            "id": str(result.inserted_id),
            "name": user["name"],
            "email": user["email"],
            "role": role,
            "active": True,
        },
    }


@router.get("/users")
async def get_all_users(user=Depends(get_current_user)):
    users = []
    async for user in db.users.find():
        user["_id"] = str(user["_id"])  # Convert ObjectId to string
        user.pop("password", None)
        users.append(user)

    admin = []
    async for user in db.admin.find():
        user["_id"] = str(user["_id"])  # Convert ObjectId to string
        user.pop("password", None)
        admin.append(user)

    total_users = len(users) + len(admin)
    active_users = sum(1 for user in users if user.get("active", False))
    inactive_users = total_users - active_users
    admin_users = sum(1 for admin in admin if admin.get("role") == "admin")

    return {
        "message": "Users retrieved successfully",
        "total_users": total_users,
        "active_users": active_users,
        "inactive_users": inactive_users,
        "admin_users": admin_users,
        "users": users,
        "admin": admin,
    }


async def _find_account(account_id: str):
    if not ObjectId.is_valid(account_id):
        raise HTTPException(status_code=400, detail="Invalid user ID.")

    object_id = ObjectId(account_id)
    account = await db.users.find_one({"_id": object_id})
    if account:
        return db.users, account

    account = await db.admin.find_one({"_id": object_id})
    if account:
        return db.admin, account

    raise HTTPException(status_code=404, detail="User not found.")


@router.put("/users/{account_id}")
async def update_account(account_id: str, data: dict, user=Depends(get_current_user)):
    collection, account = await _find_account(account_id)
    update_data = {
        key: value.strip()
        for key, value in data.items()
        if key in {"name", "email"} and isinstance(value, str) and value.strip()
    }
    if not update_data:
        raise HTTPException(status_code=400, detail="No valid account fields provided.")

    if "email" in update_data:
        update_data["email"] = update_data["email"].lower()

    await collection.update_one({"_id": account["_id"]}, {"$set": update_data})
    return {"message": "User updated successfully"}


@router.patch("/users/{account_id}/status")
async def update_account_status(account_id: str, data: dict, user=Depends(get_current_user)):
    collection, account = await _find_account(account_id)
    if not isinstance(data.get("active"), bool):
        raise HTTPException(status_code=400, detail="Active must be true or false.")

    await collection.update_one(
        {"_id": account["_id"]},
        {"$set": {"active": data["active"]}},
    )
    return {"message": "User status updated successfully", "active": data["active"]}


@router.delete("/users/{account_id}")
async def delete_account(account_id: str, user=Depends(get_current_user)):
    collection, account = await _find_account(account_id)
    await collection.delete_one({"_id": account["_id"]})
    return {"message": "User deleted successfully"}

@router.get("/analytics")
async def get_analytics(user=Depends(get_current_user)):
    if user.get("role", "").lower() != "admin":
        raise HTTPException(status_code=403, detail="Admin access required.")

    users_count = await db.users.count_documents({})
    admins_count = await db.admin.count_documents({})
    active_users = await db.users.count_documents({"active": {"$ne": False}})
    active_admins = await db.admin.count_documents({"active": {"$ne": False}})
    total_users = users_count + admins_count
    active_accounts = active_users + active_admins

    total_predictions = await db.predictions.count_documents({})
    completed_predictions = await db.predictions.count_documents({
        "status": {"$in": ["completed", "Completed"]}
    })
    prediction_documents = await db.predictions.find(
        {},
        {"model": 1},
    ).to_list(length=None)
    prediction_counts = {}
    for prediction in prediction_documents:
        model_name = prediction.get("model", "Unknown model")
        prediction_counts[model_name] = prediction_counts.get(model_name, 0) + 1

    models = await db.models.find(
        {},
        {"title": 1, "prediction_count": 1, "status": 1},
    ).to_list(length=None)

    model_usage = []
    total_model_predictions = sum(prediction_counts.values())
    for model in models:
        model_name = model.get("title", "Unnamed model")
        prediction_count = prediction_counts.get(model_name, 0)
        model_usage.append({
            "name": model_name,
            "predictions": prediction_count,
            "percentage": round(
                prediction_count / total_model_predictions * 100, 1
            ) if total_model_predictions else 0,
        })

    for model_name, prediction_count in prediction_counts.items():
        if not any(model["name"] == model_name for model in model_usage):
            model_usage.append({
                "name": model_name,
                "predictions": prediction_count,
                "percentage": round(
                    prediction_count / total_model_predictions * 100, 1
                ) if total_model_predictions else 0,
            })

    model_usage.sort(key=lambda model: model["predictions"], reverse=True)

    return {
        "message": "Analytics retrieved successfully",
        "total_users": total_users,
        "active_users": active_accounts,
        "total_predictions": total_predictions,
        "completed_predictions": completed_predictions,
        "active_models": sum(1 for model in models if model.get("status") == "Active"),
        "system_activity": round(active_accounts / total_users * 100, 1) if total_users else 0,
        "users_growth": 0,
        "predictions_growth": 0,
        "model_usage_growth": 0,
        "model_usage": model_usage,
    }


def _serialize_prediction(prediction):
    prediction["_id"] = str(prediction["_id"])
    created_at = prediction.get("created_at")
    prediction["created_at"] = created_at.isoformat() if hasattr(created_at, "isoformat") else None
    return prediction


@router.get("/predictions")
async def get_predictions(user=Depends(get_current_user)):
    if user.get("role", "").lower() != "admin":
        raise HTTPException(status_code=403, detail="Admin access required.")

    predictions = await db.predictions.find().sort("created_at", -1).limit(100).to_list(length=100)
    for prediction in predictions:
        _serialize_prediction(prediction)

    total = await db.predictions.count_documents({})
    completed = await db.predictions.count_documents({"status": {"$in": ["completed", "Completed"]}})

    return {
        "total": total,
        "completed": completed,
        "processing": max(total - completed, 0),
        "predictions": predictions,
    }


@router.get("/dashboard")
async def get_dashboard(user=Depends(get_current_user)):
    if user.get("role", "").lower() != "admin":
        raise HTTPException(status_code=403, detail="Admin access required.")

    total_users = await db.users.count_documents({}) + await db.admin.count_documents({})
    active_accounts = await db.users.count_documents({"active": {"$ne": False}}) + await db.admin.count_documents({"active": {"$ne": False}})
    total_predictions = await db.predictions.count_documents({})
    active_models = await db.models.count_documents({"status": "Active"})
    today = datetime.now(timezone.utc).replace(hour=0, minute=0, second=0, microsecond=0)
    chart_data = []
    for days_ago in range(6, -1, -1):
        start = today - timedelta(days=days_ago)
        end = start + timedelta(days=1)
        chart_data.append({
            "label": start.strftime("%a"),
            "value": await db.predictions.count_documents({"created_at": {"$gte": start, "$lt": end}}),
        })

    recent = await db.predictions.find().sort("created_at", -1).limit(5).to_list(length=5)
    recent_activity = []
    for prediction in recent:
        _serialize_prediction(prediction)
        recent_activity.append({
            "title": f'{prediction.get("user_name", "Anonymous")} completed {prediction.get("model", "prediction")}',
            "time": prediction.get("created_at"),
        })

    return {
        "total_users": total_users,
        "active_models": active_models,
        "predictions": total_predictions,
        "system_usage": round(active_accounts / total_users * 100, 1) if total_users else 0,
        "chart_data": chart_data,
        "recent_activity": recent_activity,
    }


@router.get("/activity")
async def get_activity(user=Depends(get_current_user)):
    if user.get("role", "").lower() != "admin":
        raise HTTPException(status_code=403, detail="Admin access required.")

    predictions = await db.predictions.find().sort("created_at", -1).limit(50).to_list(length=50)
    events = []
    for prediction in predictions:
        _serialize_prediction(prediction)
        events.append({
            "id": prediction["_id"],
            "user": prediction.get("user_name", "Anonymous"),
            "action": f'Completed a {prediction.get("model", "prediction")}',
            "detail": f'Result: {prediction.get("result", "-")}',
            "time": prediction.get("created_at"),
            "status": prediction.get("status", "Completed"),
        })

    users = await db.users.find({}, {"name": 1, "active": 1}).limit(20).to_list(length=20)
    return {
        "active_users": sum(1 for item in users if item.get("active", True)),
        "sessions_today": 0,
        "predictions_today": len([item for item in events if item.get("time", "").startswith(datetime.now(timezone.utc).date().isoformat())]),
        "needs_review": sum(1 for item in events if item.get("status") not in {"Completed", "Success"}),
        "events": events,
        "users": [{"name": item.get("name", "User"), "status": "Online" if item.get("active", True) else "Away"} for item in users],
    }

