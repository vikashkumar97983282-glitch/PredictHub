import random
from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr

from app.database.db_connection import db
from app.services.email_services import send_otp_email


router = APIRouter()


class SendOTPRequest(BaseModel):
    email: EmailStr


class VerifyOTPRequest(BaseModel):
    email: EmailStr
    otp: str


@router.post("/send-otp")
async def send_otp(data: SendOTPRequest):

    email = str(data.email).strip().lower()

    # Check whether email is already registered
    existing_user = await db.users.find_one({
        "email": email
    })

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="This email is already registered."
        )

    # Generate 6 digit OTP
    otp = str(random.randint(100000, 999999))

    expires_at = datetime.now(timezone.utc) + timedelta(minutes=5)

    # Remove previous OTP
    await db.email_otps.delete_many({
        "email": email
    })

    # Store new OTP
    await db.email_otps.insert_one({
        "email": email,
        "otp": otp,
        "expires_at": expires_at,
        "verified": False,
    })

    # Send email
    try:
        await send_otp_email(email, otp)

    except Exception as e:
        await db.email_otps.delete_many({
            "email": email
        })

        print("Email error:", e)

        raise HTTPException(
            status_code=500,
            detail="Unable to send verification email."
        )

    return {
        "success": True,
        "message": "OTP sent successfully."
    }


@router.post("/verify-otp")
async def verify_otp(data: VerifyOTPRequest):

    email = str(data.email).strip().lower()

    record = await db.email_otps.find_one({
        "email": email,
        "otp": data.otp,
    })

    if not record:
        raise HTTPException(
            status_code=400,
            detail="Invalid OTP."
        )

    now = datetime.now(timezone.utc)

    expires_at = record["expires_at"]

    if expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=timezone.utc)

    if now > expires_at:

        await db.email_otps.delete_many({
            "email": email
        })

        raise HTTPException(
            status_code=400,
            detail="OTP has expired."
        )

    # Mark email as verified
    await db.email_otps.update_one(
        {"_id": record["_id"]},
        {
            "$set": {
                "verified": True
            }
        }
    )

    return {
        "success": True,
        "verified": True,
        "message": "Email verified successfully."
    }