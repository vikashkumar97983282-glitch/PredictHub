from typing import Optional, Annotated
from jose import jwt, JWTError
from datetime import datetime, timedelta, timezone

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

from app.database.db_connection import db

import os
from dotenv import load_dotenv


load_dotenv()


# ============================================================
# JWT CONFIGURATION
# ============================================================

SECRET_KEY = os.getenv("JWT_SECRET_KEY")

if not SECRET_KEY:
    raise RuntimeError("JWT_SECRET_KEY is missing")

ALGORITHM = "HS256"

ACCESS_TOKEN_EXPIRE_MINUTES = 30


# ============================================================
# OAUTH2
# ============================================================

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/login/"
)

optional_oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/login/",
    auto_error=False,
)


# ============================================================
# CREATE ACCESS TOKEN
# ============================================================

def create_access_token(
    user_id: str,
    email: str,
    role: str,
    expires_delta: Optional[timedelta] = None,
):
    """
    Create JWT access token.
    """

    if expires_delta is None:
        expires_delta = timedelta(
            minutes=ACCESS_TOKEN_EXPIRE_MINUTES
        )

    expire = datetime.now(timezone.utc) + expires_delta

    payload = {
        "sub": email,
        "user_id": user_id,
        "role": role,
        "exp": expire,
    }

    token = jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=ALGORITHM,
    )

    return token


# ============================================================
# GET CURRENT USER
# ============================================================

async def get_current_user(
    token: Annotated[str, Depends(oauth2_scheme)]
):
    """
    Validate JWT and return current user.
    """

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid authentication credentials",
        headers={
            "WWW-Authenticate": "Bearer"
        },
    )

    # --------------------------------------------------------
    # CHECK BLACKLIST
    # --------------------------------------------------------

    blacklisted_token = await db.blacklisted_tokens.find_one({
        "token": token
    })

    if blacklisted_token:
        raise credentials_exception

    # --------------------------------------------------------
    # DECODE JWT
    # --------------------------------------------------------

    try:

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM],
        )

        email = payload.get("email") or payload.get("sub")

        if email is None:
            raise credentials_exception

    except JWTError:

        raise credentials_exception

    # --------------------------------------------------------
    # FIND USER
    # --------------------------------------------------------

    user = await db.users.find_one({
        "email": email.lower()
    })

    if user is None:
        user = await db.admin.find_one({
            "email": email.lower()
        })

    if user is None:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
            headers={
                "WWW-Authenticate": "Bearer"
            },
        )

    return user


async def get_optional_current_user(
    token: Annotated[Optional[str], Depends(optional_oauth2_scheme)]
):
    if not token:
        return None

    return await get_current_user(token)


# ============================================================
# REVOKE TOKEN
# ============================================================

async def revoke_token(token: str):
    """
    Immediately invalidate a JWT by adding it to blacklist.
    """

    # --------------------------------------------------------
    # CHECK IF TOKEN ALREADY BLACKLISTED
    # --------------------------------------------------------

    existing_token = await db.blacklisted_tokens.find_one({
        "token": token
    })

    if existing_token:
        return

    # --------------------------------------------------------
    # READ TOKEN EXPIRATION
    # --------------------------------------------------------

    expires_at = None

    try:

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM],
            options={
                "verify_exp": False
            },
        )

        exp = payload.get("exp")

        if exp:
            expires_at = datetime.fromtimestamp(
                exp,
                timezone.utc
            )

    except JWTError:
        pass

    # --------------------------------------------------------
    # SAVE TOKEN TO BLACKLIST
    # --------------------------------------------------------

    blacklist_data = {
        "token": token,
        "revoked_at": datetime.now(timezone.utc),
    }

    if expires_at:
        blacklist_data["expires_at"] = expires_at

    await db.blacklisted_tokens.insert_one(
        blacklist_data
    )