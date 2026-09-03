from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordBearer

from app.services.jwt_services import revoke_token


router = APIRouter()


oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/login/"
)


# ============================================================
# LOGOUT
# ============================================================

@router.post("/")
async def logout(
    token: str = Depends(oauth2_scheme)
):

    await revoke_token(token)

    return {
        "message": "Logout successful"
    }