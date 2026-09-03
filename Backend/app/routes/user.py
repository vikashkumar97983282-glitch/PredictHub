from fastapi import APIRouter, HTTPException
from app.schemas.security_schema import UserRegisterSchema
from app.database.db_connection import db
from app.services.hash_password import hash_password
from app.services.jwt_services import create_access_token


router = APIRouter()



@router.get('/')
def home():
    return {
        'message':'this is PredictHub application from Fastapi!',

        }

@router.get("/about")
def about():
    return {
        "message":"this is user router for testing it is running or not"
    }



@router.post("/register")
async def register(data: UserRegisterSchema):

    user = await db.users.find_one({"email": data.email.lower()})

    if user:
        raise HTTPException(status_code=409, detail="User already exists")

    if data.password != data.confirm_password:
        raise HTTPException(
            status_code=400,
            detail="Password and confirm password do not match",
        )

    password_hashed = hash_password(data.password)

    user_data = {
        "name": data.name,
        "email": data.email.lower(),
        "password": password_hashed,
        "role": data.role.lower(),
    }

    result = await db.users.insert_one(user_data)

    role = data.role.lower()
    user = {
        "id": str(result.inserted_id),
        "name": data.name,
        "email": data.email.lower(),
        "role": role,
    }

    return {
        "message": "User registered successfully",
        "token": create_access_token(
            user_id=user["id"],
            email=user["email"],
            role=role,
        ),
        "user": user,
    }