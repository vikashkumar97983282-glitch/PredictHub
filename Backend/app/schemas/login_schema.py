from pydantic import BaseModel, EmailStr, Field


class Login(BaseModel):
    email: EmailStr = Field(..., description="Admin email address")
    password: str = Field(..., description="Admin password")