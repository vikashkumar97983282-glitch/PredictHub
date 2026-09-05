from pydantic import BaseModel, Field , EmailStr



class AdminCreate(BaseModel):
    name: str = Field(..., description="Admin name")
    age: int = Field(..., description="Admin age")
    email: EmailStr = Field(..., description="Admin email address")
    password: str = Field(..., description="Admin password")
    confirm_password: str = Field(..., description="Confirm admin password")
    role: str = "admin"




class AdminLoginResponse(BaseModel):
    message: str = Field(..., description="Response message")
    token: str = Field(..., description="JWT token for authentication")



class AdminUpdate(BaseModel):
    name: str = Field(..., description="Admin name")
    email: EmailStr = Field(..., description="Admin email address")
    password: str = Field(..., description="Admin password")
    confirm_password: str = Field(..., description="Confirm admin password")
    role: str = "admin"


class AdminUser(BaseModel):
    total_users: int = Field(..., description="Total number of users")
    active_users: int = Field(..., description="Number of active users")
    inactive_users: int = Field(..., description="Number of inactive users")
    admin_users: int = Field(..., description="Number of admin users")
    users: list = Field(..., description="List of users with their details")