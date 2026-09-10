import os
from email.message import EmailMessage

import aiosmtplib
from dotenv import load_dotenv

load_dotenv()


async def send_otp_email(to_email: str, otp: str):
    message = EmailMessage()

    message["From"] = os.getenv("SMTP_EMAIL")
    message["To"] = to_email
    message["Subject"] = "PredictHub Email Verification"

    message.set_content(
        f"""
Hello,

Your PredictHub email verification OTP is:

{otp}

This OTP is valid for 5 minutes.

If you did not request this verification, please ignore this email.

Regards,
PredictHub Team
"""
    )

    await aiosmtplib.send(
        message,
        hostname=os.getenv("SMTP_HOST"),
        port=int(os.getenv("SMTP_PORT", 587)),
        start_tls=True,
        username=os.getenv("SMTP_EMAIL"),
        password=os.getenv("SMTP_PASSWORD"),
    )