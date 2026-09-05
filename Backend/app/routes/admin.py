from bson import ObjectId
from fastapi import APIRouter, Depends, HTTPException
from app.core.jwt_services import get_current_user
from app.schemas.admin_schema import AdminLoginResponse, AdminCreate, AdminUpdate, AdminUser
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

    admin = await db.admin.find_one({"email": data.email.lower()})

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
        {"email": data.email.lower()},
        {"$set": update_data}
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Admin not found.")

    return {
        "message": "Admin updated successfully"
    }


@router.post("/add_model")
async def add_model(data: AdminModelCreate):

    model_data = data.model_dump()

    result = await db.models.insert_one(model_data)

    return {
        "message": "Model added successfully",
        "model_id": str(result.inserted_id)
    }


@router.put("/models/{model_id}")
async def update_model(model_id: str, data: AdminModelCreate):
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
async def update_model_status(model_id: str, data: AdminModelStatusUpdate):
    if not ObjectId.is_valid(model_id):
        raise HTTPException(status_code=400, detail="Invalid model ID.")

    if data.status not in {"Active", "Inactive"}:
        raise HTTPException(status_code=400, detail="Status must be Active or Inactive.")

    result = await db.models.update_one(
        {"_id": ObjectId(model_id)},
        {"$set": {"status": data.status}},
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Model not found.")

    return {
        "message": "Model status updated successfully",
        "model_id": model_id,
        "status": data.status,
    }



@router.get("/users")
async def get_all_users():
    users = []
    async for user in db.users.find():
        user["_id"] = str(user["_id"])  # Convert ObjectId to string
        users.append(user)

    admin = []
    async for user in db.admin.find():
        user["_id"] = str(user["_id"])  # Convert ObjectId to string
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

