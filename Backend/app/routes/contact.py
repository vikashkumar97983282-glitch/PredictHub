from fastapi import APIRouter



router = APIRouter()





@router.get("/contact")
def contact():
    return "this is contact routes"