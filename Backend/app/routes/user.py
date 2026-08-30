from fastapi import APIRouter

router = APIRouter()



@router.get('/')
def home():
    return {
        'message':'this is PredictHub application from Fastapi!',

        }