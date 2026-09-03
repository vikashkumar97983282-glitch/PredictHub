from fastapi import APIRouter, HTTPException, status

from app.schemas.login_schema import Login
from app.database.db_connection import db

from app.services.jwt_services import create_access_token
from app.services.hash_password import verify_password


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

    user = await db.admin.find_one({
        "email": email
    })

    if user is None:
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

    try:
        password_valid = verify_password(
            data.password,
            user["password"]
        )
    except (TypeError, ValueError):
        password_valid = False

    if not password_valid:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
            headers={
                "WWW-Authenticate": "Bearer"
            },
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