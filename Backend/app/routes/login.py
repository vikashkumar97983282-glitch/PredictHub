from fastapi import APIRouter, HTTPException

from app.schemas.login_schema import Login
from app.database.db_connection import db
from app.services.hash_password import verify_password


router = APIRouter()


@router.post("/login")
async def login(data: Login):

    email = data.email.strip().lower()

    # =========================================================
    # 1. CHECK ADMIN
    # =========================================================

    admin = await db.admin.find_one({
        "email": email
    })

    if admin:

        password_correct = verify_password(
            data.password,
            admin["password"]
        )

        if not password_correct:
            raise HTTPException(
                status_code=401,
                detail="Invalid email or password"
            )

        return {
            "message": "Admin login successful",
            "role": "admin",
            "user": {
                "id": str(admin["_id"]),
                "name": admin["name"],
                "email": admin["email"],
                "role": "admin"
            }
        }

    # =========================================================
    # 2. CHECK NORMAL USER
    # =========================================================

    user = await db.users.find_one({
        "email": email
    })

    if user:

        password_correct = verify_password(
            data.password,
            user["password"]
        )

        if not password_correct:
            raise HTTPException(
                status_code=401,
                detail="Invalid email or password"
            )

        return {
            "message": "Login successful",
            "role": "user",
            "user": {
                "id": str(user["_id"]),
                "name": user["name"],
                "email": user["email"],
                "role": user.get("role", "user")
            }
        }

    # =========================================================
    # 3. EMAIL NOT FOUND
    # =========================================================

    raise HTTPException(
        status_code=401,
        detail="Invalid email or password"
    )