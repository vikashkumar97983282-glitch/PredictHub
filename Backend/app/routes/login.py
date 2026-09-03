from fastapi import APIRouter, HTTPException

from app.schemas.login_schema import Login
from app.database.db_connection import db
from app.services.hash_password import verify_password
from app.services.jwt_services import create_access_token


router = APIRouter()


@router.post("/login")
async def login(data: Login):

    email = data.email.strip().lower()

    # =====================================================
    # CHECK ADMIN
    # =====================================================

    admin = await db.admin.find_one({
        "email": email
    })

    if admin:

        if not verify_password(
            data.password,
            admin["password"]
        ):
            raise HTTPException(
                status_code=401,
                detail="Invalid email or password"
            )

        token = create_access_token(
            user_id=str(admin["_id"]),
            email=admin["email"],
            role="admin"
        )

        return {
            "message": "Admin login successful",
            "token": token,
            "user": {
                "id": str(admin["_id"]),
                "name": admin["name"],
                "email": admin["email"],
                "role": "admin"
            }
        }

    # =====================================================
    # CHECK NORMAL USER
    # =====================================================

    user = await db.users.find_one({
        "email": email
    })

    if user:

        if not verify_password(
            data.password,
            user["password"]
        ):
            raise HTTPException(
                status_code=401,
                detail="Invalid email or password"
            )

        token = create_access_token(
            user_id=str(user["_id"]),
            email=user["email"],
            role=user.get("role", "user")
        )

        return {
            "message": "Login successful",
            "token": token,
            "user": {
                "id": str(user["_id"]),
                "name": user["name"],
                "email": user["email"],
                "role": user.get("role", "user")
            }
        }

    # =====================================================
    # EMAIL NOT FOUND
    # =====================================================

    raise HTTPException(
        status_code=401,
        detail="Invalid email or password"
    )