from fastapi import APIRouter

router = APIRouter()



@router.get('/')
def home():
    return {
        'message':'this is PredictHub application from Fastapi!',

        }

@router.get("/about")
def about():
    return {
        "message":"this is user router for testing it is running or not"
    }