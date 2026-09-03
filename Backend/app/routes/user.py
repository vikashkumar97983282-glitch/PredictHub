from fastapi import APIRouter
from app.schemas.auth_schema import UserRegisterSchema
from app.database.db_connection import db


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
        return {
            "message": "User already exists"
        }

    if data.password != data.confirm_password:
        return {
            "message": "Password and confirm password do not match"
        }

    user_data = {
        "name": data.name,
        "email": data.email.lower(),
        "password": data.password,
        "role": data.role,
    }

    result = await db.users.insert_one(user_data)

    return {
        "message": "User registered successfully",
        "user_id": str(result.inserted_id),
        "role": data.role,
    }