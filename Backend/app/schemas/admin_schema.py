from pydantic import BaseModel, Field , EmailStr



class AdminCreate(BaseModel):
    name: str = Field(..., description="Admin name")
    age: int = Field(..., description="Admin age")
    email: EmailStr = Field(..., description="Admin email address")
    password: str = Field(..., description="Admin password")
    confirm_password: str = Field(..., description="Confirm admin password")

class AdminLogin(BaseModel):
    email: EmailStr = Field(..., description="Admin email address")
    password: str = Field(..., description="Admin password")


class AdminLoginResponse(BaseModel):
    message: str = Field(..., description="Response message")
    token: str = Field(..., description="JWT token for authentication")