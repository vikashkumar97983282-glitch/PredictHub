from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.db_connection import (
    connect_to_database,
    close_database,
)


# ============================================================
# Application lifespan
# ============================================================

@asynccontextmanager
async def lifespan(app: FastAPI):

    # --------------------------------------------------------
    # Startup
    # --------------------------------------------------------

    await connect_to_database()

    yield

    # --------------------------------------------------------
    # Shutdown
    # --------------------------------------------------------

    await close_database()


# ============================================================
# Create FastAPI application
# ============================================================

def create_app() -> FastAPI:

    app = FastAPI(
        title="PredictHub API",
        description="Machine Learning Prediction API",
        version="1.0.0",
        lifespan=lifespan,
    )

    # ========================================================
    # CORS
    # ========================================================

    app.add_middleware(
        CORSMiddleware,

        allow_origins=[
            "http://localhost:5173",
            "https://predicthub-lac.vercel.app",
        ],

        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # ========================================================
    # Home
    # ========================================================

    @app.get("/")
    async def home():

        return {
            "message": "Connect your data, choose a model, and get intelligent predictions in seconds."
        }

    # ========================================================
    # Routes
    # ========================================================

    from app.routes.user import router as user_router
    from app.routes.models import router as model_router
    from app.routes.admin import router as admin_router
    from app.routes.login import router as login_router


    app.include_router(
        login_router,
        prefix="/login",
        tags=["login"],
    )

    app.include_router(
        user_router,
        prefix="/user",
        tags=["user"],
    )

    app.include_router(
        model_router,
        prefix="/model",
        tags=["model"],
    )

    app.include_router(
        admin_router,
        prefix="/admin",
        tags=["admin"],
    )

    return app