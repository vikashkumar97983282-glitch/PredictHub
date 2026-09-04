from pydantic import BaseModel, EmailStr, Field




class UserRegisterSchema(BaseModel):
    name: str = Field(..., description="Admin name")
    email: EmailStr = Field(..., description="Admin email address")
    age: int = Field(..., ge=13, le=120, description="User age")
    address: str = Field(..., min_length=3, description="User address")
    nationality: str = Field(..., min_length=2, max_length=80, description="User nationality")
    password: str = Field(..., description="Admin password", min_length=8, max_length=12)
    confirm_password: str = Field(..., description="Confirm admin password", min_length=8, max_length=12)
    role: str = "user"