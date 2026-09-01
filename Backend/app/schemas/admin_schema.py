from pydantic import BaseModel, Field , EmailStr



class AdminLogin(BaseModel):
    email: EmailStr = Field(..., description="Admin email address")
    password: str = Field(..., description="Admin password")


class AdminLoginResponse(BaseModel):
    message: str = Field(..., description="Response message")
    token: str = Field(..., description="JWT token for authentication")