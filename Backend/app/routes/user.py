from fastapi import APIRouter, HTTPException

from app.schemas.security_schema import UserRegisterSchema

from app.database.db_connection import db

from app.services.hash_password import hash_password
from app.services.jwt_services import create_access_token


router = APIRouter()


# ============================================================
# USER HOME
# ============================================================

@router.get("/")
async def home():

    return {
        "message": "This is PredictHub application from FastAPI!"
    }


# ============================================================
# ABOUT
# ============================================================

@router.get("/about")
async def about():

    return {
        "message": "This is user router for testing."
    }


# ============================================================
# REGISTER
# ============================================================

@router.post("/register")
async def register(
    data: UserRegisterSchema
):

    # --------------------------------------------------------
    # NORMALIZE EMAIL
    # --------------------------------------------------------

    email = data.email.lower().strip()

    # --------------------------------------------------------
    # CHECK EXISTING USER
    # --------------------------------------------------------

    existing_user = await db.users.find_one({
        "email": email
    })

    if existing_user:

        raise HTTPException(
            status_code=409,
            detail="User already exists"
        )

    # --------------------------------------------------------
    # CHECK PASSWORD
    # --------------------------------------------------------

    if data.password != data.confirm_password:

        raise HTTPException(
            status_code=400,
            detail="Password and confirm password do not match"
        )

    # --------------------------------------------------------
    # HASH PASSWORD
    # --------------------------------------------------------

    password_hashed = hash_password(
        data.password
    )

    # --------------------------------------------------------
    # USER DATA
    # --------------------------------------------------------

    role = data.role.lower().strip()

    user_data = {
        "name": data.name,
        "email": email,
        "age": data.age,
        "address": data.address,
        "nationality": data.nationality,
        "password": password_hashed,
        "role": role,
    }

    # --------------------------------------------------------
    # INSERT USER
    # --------------------------------------------------------

    result = await db.users.insert_one(
        user_data
    )

    # --------------------------------------------------------
    # RESPONSE USER
    # --------------------------------------------------------

    user = {
        "id": str(result.inserted_id),
        "name": data.name,
        "email": email,
        "age": data.age,
        "address": data.address,
        "nationality": data.nationality,
        "role": role,
    }

    # --------------------------------------------------------
    # CREATE JWT
    # --------------------------------------------------------

    token = create_access_token(
        user_id=user["id"],
        email=user["email"],
        role=user["role"],
    )

    # --------------------------------------------------------
    # RESPONSE
    # --------------------------------------------------------

    return {
        "message": "User registered successfully",
        "token": token,
        "user": user,
    }


@router.post("/update")
def update_user():
    return {
        "message": "Update user endpoint"
    }