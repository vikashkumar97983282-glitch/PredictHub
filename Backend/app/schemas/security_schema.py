from pydantic import BaseModel, EmailStr, Field




class UserRegisterSchema(BaseModel):
    name: str = Field(..., description="Admin name")
    email: EmailStr = Field(..., description="Admin email address")
    password: str = Field(..., description="Admin password", min_length=8, max_length=12)
    confirm_password: str = Field(..., description="Confirm admin password", min_length=8, max_length=12)
    role: str = "user"