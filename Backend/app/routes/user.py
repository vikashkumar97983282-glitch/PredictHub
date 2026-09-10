from datetime import datetime, timedelta, timezone

import random

from fastapi import APIRouter, HTTPException

from app.schemas.security_schema import UserRegisterSchema

from app.schemas.otp_schema import (
    SendOTPRequest,
    VerifyOTPRequest,
)

from app.database.db_connection import db

from app.services.hash_password import hash_password

from app.services.jwt_services import create_access_token

from app.services.email_services import send_otp_email


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
# SEND OTP
# ============================================================

@router.post("/send-otp")
async def send_otp(
    data: SendOTPRequest
):

    # --------------------------------------------------------
    # NORMALIZE EMAIL
    # --------------------------------------------------------

    email = str(
        data.email
    ).strip().lower()


    # --------------------------------------------------------
    # CHECK EXISTING USER
    # --------------------------------------------------------

    existing_user = await db.users.find_one({
        "email": email
    })


    if existing_user:

        raise HTTPException(
            status_code=409,
            detail="This email is already registered."
        )


    # --------------------------------------------------------
    # GENERATE OTP
    # --------------------------------------------------------

    otp = str(
        random.randint(
            100000,
            999999
        )
    )


    # --------------------------------------------------------
    # OTP EXPIRATION
    # --------------------------------------------------------

    expires_at = (
        datetime.now(timezone.utc)
        + timedelta(minutes=5)
    )


    # --------------------------------------------------------
    # DELETE PREVIOUS OTP
    # --------------------------------------------------------

    await db.email_otps.delete_many({
        "email": email
    })


    # --------------------------------------------------------
    # STORE OTP
    # --------------------------------------------------------

    await db.email_otps.insert_one({

        "email": email,

        "otp": otp,

        "expires_at": expires_at,

        "verified": False,

        "created_at":
            datetime.now(timezone.utc),

    })


    # --------------------------------------------------------
    # SEND EMAIL
    # --------------------------------------------------------

    try:

        await send_otp_email(
            email,
            otp
        )

    except Exception as error:

        print(
            "OTP email error:",
            repr(error)
        )


        # Delete OTP if sending failed

        await db.email_otps.delete_many({
            "email": email
        })


        raise HTTPException(
            status_code=500,
            detail="Unable to send verification email."
        )


    # --------------------------------------------------------
    # RESPONSE
    # --------------------------------------------------------

    return {

        "success": True,

        "message":
            "OTP sent successfully.",

    }


# ============================================================
# VERIFY OTP
# ============================================================

@router.post("/verify-otp")
async def verify_otp(
    data: VerifyOTPRequest
):

    # --------------------------------------------------------
    # NORMALIZE
    # --------------------------------------------------------

    email = str(
        data.email
    ).strip().lower()


    otp = str(
        data.otp
    ).strip()


    # --------------------------------------------------------
    # OTP FORMAT
    # --------------------------------------------------------

    if not otp.isdigit() or len(otp) != 6:

        raise HTTPException(
            status_code=400,
            detail="OTP must be a 6-digit number."
        )


    # --------------------------------------------------------
    # FIND OTP
    # --------------------------------------------------------

    record = await db.email_otps.find_one({

        "email": email,

        "otp": otp,

    })


    if not record:

        raise HTTPException(
            status_code=400,
            detail="Invalid OTP."
        )


    # --------------------------------------------------------
    # CHECK EXPIRATION
    # --------------------------------------------------------

    now = datetime.now(
        timezone.utc
    )


    expires_at = record.get(
        "expires_at"
    )


    if not expires_at:

        await db.email_otps.delete_one({
            "_id": record["_id"]
        })


        raise HTTPException(
            status_code=400,
            detail="Invalid OTP."
        )


    # --------------------------------------------------------
    # HANDLE NAIVE DATETIME
    # --------------------------------------------------------

    if expires_at.tzinfo is None:

        expires_at = expires_at.replace(
            tzinfo=timezone.utc
        )


    # --------------------------------------------------------
    # EXPIRED
    # --------------------------------------------------------

    if now > expires_at:

        await db.email_otps.delete_one({
            "_id": record["_id"]
        })


        raise HTTPException(
            status_code=400,
            detail="OTP has expired. Please request a new OTP."
        )


    # --------------------------------------------------------
    # MARK VERIFIED
    # --------------------------------------------------------

    await db.email_otps.update_one(

        {
            "_id":
                record["_id"]
        },

        {
            "$set": {

                "verified":
                    True,

                "verified_at":
                    datetime.now(
                        timezone.utc
                    ),

            }
        }
    )


    # --------------------------------------------------------
    # RESPONSE
    # --------------------------------------------------------

    return {

        "success": True,

        "verified": True,

        "message":
            "Email verified successfully."

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

    email = str(
        data.email
    ).strip().lower()


    # --------------------------------------------------------
    # CHECK EXISTING USER
    # --------------------------------------------------------

    existing_user = await db.users.find_one({

        "email": email

    })


    if existing_user:

        raise HTTPException(
            status_code=409,
            detail="User already exists."
        )


    # --------------------------------------------------------
    # CHECK EMAIL VERIFICATION
    # --------------------------------------------------------

    verified_email = await db.email_otps.find_one({

        "email": email,

        "verified": True,

    })


    if not verified_email:

        raise HTTPException(
            status_code=400,
            detail=(
                "Please verify your email "
                "before registering."
            )
        )


    # --------------------------------------------------------
    # CHECK PASSWORD
    # --------------------------------------------------------

    if (
        data.password
        != data.confirm_password
    ):

        raise HTTPException(
            status_code=400,
            detail=(
                "Password and confirm password "
                "do not match."
            )
        )


    # --------------------------------------------------------
    # PASSWORD LENGTH
    # --------------------------------------------------------

    if len(data.password) < 8:

        raise HTTPException(
            status_code=400,
            detail=(
                "Password must contain "
                "at least 8 characters."
            )
        )


    # --------------------------------------------------------
    # HASH PASSWORD
    # --------------------------------------------------------

    password_hashed = hash_password(
        data.password
    )


    # --------------------------------------------------------
    # ROLE
    # --------------------------------------------------------

    role = str(
        data.role
    ).strip().lower()


    # --------------------------------------------------------
    # ACTIVE
    # --------------------------------------------------------

    active = True


    # --------------------------------------------------------
    # USER DATA
    # --------------------------------------------------------

    user_data = {

        "name":
            data.name,

        "email":
            email,

        "age":
            data.age,

        "address":
            data.address,

        "nationality":
            data.nationality,

        "password":
            password_hashed,

        "role":
            role,

        "active":
            active,

        "email_verified":
            True,

        "created_at":
            datetime.now(
                timezone.utc
            ),

    }


    # --------------------------------------------------------
    # INSERT
    # --------------------------------------------------------

    result = await db.users.insert_one(
        user_data
    )


    # --------------------------------------------------------
    # USER RESPONSE
    # --------------------------------------------------------

    user = {

        "id":
            str(
                result.inserted_id
            ),

        "name":
            data.name,

        "email":
            email,

        "age":
            data.age,

        "address":
            data.address,

        "nationality":
            data.nationality,

        "role":
            role,

        "active":
            active,

        "email_verified":
            True,

    }


    # --------------------------------------------------------
    # JWT
    # --------------------------------------------------------

    token = create_access_token(

        user_id=user["id"],

        email=user["email"],

        role=user["role"],

    )


    # --------------------------------------------------------
    # DELETE USED OTP
    # --------------------------------------------------------

    await db.email_otps.delete_many({

        "email": email

    })


    # --------------------------------------------------------
    # RESPONSE
    # --------------------------------------------------------

    return {

        "message":
            "User registered successfully.",

        "token":
            token,

        "user":
            user,

    }


# ============================================================
# UPDATE USER
# ============================================================

@router.post("/update")
async def update_user():

    return {

        "message":
            "Update user endpoint"

    }