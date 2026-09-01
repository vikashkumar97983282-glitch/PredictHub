from fastapi import APIRouter
from app.schemas.admin_schema import AdminLogin, AdminLoginResponse



router = APIRouter()






@router.get('/')
def home():
    return {
        'message':'this is PredictHub application from Fastapi! from admin router',

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