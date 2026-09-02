from fastapi import APIRouter
from app.schemas.admin_schema import AdminLogin, AdminLoginResponse, AdminCreate
from app.database.db_connection import db,collection



router = APIRouter()






@router.get('/')
def home():
    return {
        'message':'this is PredictHub application from Fastapi! from admin router',

        }



@router.post('/create_admin')
async def create_admin(data: AdminCreate):
    if data.password != data.confirm_password:
        return {
            'message':'Password and confirm password do not match'
        }

    user = await collection.count_documents({})

    if user > 0:
        return {
            'message':'Admin already exists'
        }
    
    admin = {
        "name": data.name,
        "email": data.email.lower(),
        "password": data.password,
        "role": "admin",
    }

    result = await db.admin.insert_one(admin)

    return {
        "message": "Admin created successfully",
        "user_id": str(result.inserted_id),
        "role": "admin",
    }



@router.post('/login',response_model=AdminLoginResponse)
def login(data: AdminLogin):

    if data.email != "admin@gmail.com" or data.password != "admin123":
        return {
            'message':'Invalid email or password',
            'token': None
        }
    return {
        'message':'Login successful',
        'token': 'your_jwt_token_here'
    }