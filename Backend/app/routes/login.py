from fastapi import APIRouter, HTTPException, status

from app.schemas.login_schema import Login
from app.database.db_connection import db

from app.services.jwt_services import create_access_token
from app.services.hash_password import hash_password, verify_password
import hmac


router = APIRouter()


# ============================================================
# LOGIN
# ============================================================

@router.post("/")
async def login(
    data: Login
):

    # --------------------------------------------------------
    # NORMALIZE EMAIL
    # --------------------------------------------------------

    email = data.email.lower().strip()

    # --------------------------------------------------------
    # FIND ADMIN OR USER
    # --------------------------------------------------------

    user_collection = db.admin
    user = await user_collection.find_one({
        "email": email
    })

    if user is None:
        user_collection = db.users
        user = await db.users.find_one({
            "email": email
        })

    if user is None:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
            headers={
                "WWW-Authenticate": "Bearer"
            },
        )

    # --------------------------------------------------------
    # VERIFY PASSWORD
    # --------------------------------------------------------

    stored_password = user.get("password", "")
    password_valid = False
    legacy_password = False

    try:
        password_valid = verify_password(data.password, stored_password)
    except (TypeError, ValueError):
        legacy_password = hmac.compare_digest(data.password, str(stored_password))
        password_valid = legacy_password

    if not password_valid:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
            headers={
                "WWW-Authenticate": "Bearer"
            },
        )

    if legacy_password:
        await user_collection.update_one(
            {"_id": user["_id"]},
            {"$set": {"password": hash_password(data.password)}},
        )

    # --------------------------------------------------------
    # USER INFORMATION
    # --------------------------------------------------------

    user_data = {
        "id": str(user["_id"]),
        "name": user["name"],
        "email": user["email"],
        "role": user.get("role", "user").lower(),
    }

    # --------------------------------------------------------
    # CREATE JWT
    # --------------------------------------------------------

    token = create_access_token(
        user_id=user_data["id"],
        email=user_data["email"],
        role=user_data["role"],
    )

    # --------------------------------------------------------
    # RESPONSE
    # --------------------------------------------------------

    return {
        "message": "Login successful",
        "token": token,
        "user": user_data,
    }