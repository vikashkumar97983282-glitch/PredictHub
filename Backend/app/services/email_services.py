import os

import resend
from dotenv import load_dotenv


# ============================================================
# LOAD ENVIRONMENT VARIABLES
# ============================================================

load_dotenv()


# ============================================================
# RESEND CONFIGURATION
# ============================================================

RESEND_API_KEY = os.getenv("RESEND_API_KEY")

RESEND_FROM_EMAIL = os.getenv(
    "RESEND_FROM_EMAIL",
    "onboarding@resend.dev",
)


if not RESEND_API_KEY:
    raise RuntimeError(
        "RESEND_API_KEY environment variable is not configured."
    )


# Configure Resend
resend.api_key = RESEND_API_KEY


# ============================================================
# SEND OTP EMAIL
# ============================================================

async def send_otp_email(
    to_email: str,
    otp: str,
):
    """
    Send email verification OTP using Resend API.
    """

    params: resend.Emails.SendParams = {

        "from": RESEND_FROM_EMAIL,

        "to": [
            to_email
        ],

        "subject": "PredictHub Email Verification",

        "html": f"""
        <!DOCTYPE html>

        <html>

        <head>

            <meta charset="UTF-8">

            <meta name="viewport"
                  content="width=device-width, initial-scale=1.0">

            <title>PredictHub Verification</title>

        </head>

        <body
            style="
                margin:0;
                padding:0;
                background:#0f172a;
                font-family:Arial,Helvetica,sans-serif;
            "
        >

            <div
                style="
                    max-width:600px;
                    margin:40px auto;
                    padding:20px;
                "
            >

                <div
                    style="
                        background:#111827;
                        border:1px solid #1e293b;
                        border-radius:16px;
                        padding:35px;
                        color:#ffffff;
                    "
                >

                    <h1
                        style="
                            margin:0 0 10px;
                            font-size:28px;
                            color:#60a5fa;
                        "
                    >
                        PredictHub
                    </h1>

                    <p
                        style="
                            color:#94a3b8;
                            font-size:15px;
                            margin-bottom:30px;
                        "
                    >
                        Machine Learning Prediction Platform
                    </p>

                    <h2
                        style="
                            margin-bottom:10px;
                            font-size:22px;
                        "
                    >
                        Verify your email
                    </h2>

                    <p
                        style="
                            color:#cbd5e1;
                            line-height:1.6;
                            font-size:15px;
                        "
                    >
                        Thank you for registering with PredictHub.
                        Use the verification code below to verify
                        your email address.
                    </p>

                    <div
                        style="
                            margin:30px 0;
                            padding:20px;
                            text-align:center;
                            background:#020617;
                            border:1px solid #334155;
                            border-radius:12px;
                        "
                    >

                        <div
                            style="
                                font-size:12px;
                                color:#64748b;
                                margin-bottom:8px;
                                text-transform:uppercase;
                                letter-spacing:2px;
                            "
                        >
                            Verification Code
                        </div>

                        <div
                            style="
                                font-size:36px;
                                font-weight:bold;
                                letter-spacing:10px;
                                color:#60a5fa;
                            "
                        >
                            {otp}
                        </div>

                    </div>

                    <p
                        style="
                            color:#94a3b8;
                            font-size:14px;
                            line-height:1.6;
                        "
                    >
                        This verification code will expire in
                        <strong style="color:#ffffff;">
                            5 minutes
                        </strong>.
                    </p>

                    <p
                        style="
                            color:#64748b;
                            font-size:13px;
                            margin-top:30px;
                            line-height:1.6;
                        "
                    >
                        If you did not request this verification code,
                        you can safely ignore this email.
                    </p>

                    <hr
                        style="
                            border:0;
                            border-top:1px solid #1e293b;
                            margin:30px 0;
                        "
                    >

                    <p
                        style="
                            margin:0;
                            color:#475569;
                            font-size:12px;
                        "
                    >
                        © 2026 PredictHub. All rights reserved.
                    </p>

                </div>

            </div>

        </body>

        </html>
        """,
    }

    try:

        email = await resend.Emails.send_async(
            params
        )

        print(
            "OTP email sent successfully:",
            email
        )

        return email

    except Exception as error:

        print(
            "Resend email error:",
            repr(error)
        )

        raise