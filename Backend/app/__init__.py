from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.db_connection import (
    connect_to_database,
    close_database,
)


# ============================================================
# APPLICATION LIFESPAN
# ============================================================

@asynccontextmanager
async def lifespan(app: FastAPI):

    # --------------------------------------------------------
    # STARTUP
    # --------------------------------------------------------

    await connect_to_database()

    yield

    # --------------------------------------------------------
    # SHUTDOWN
    # --------------------------------------------------------

    await close_database()


# ============================================================
# CREATE FASTAPI APPLICATION
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
    # HOME
    # ========================================================

    @app.get("/")
    async def home():

        return {
            "message": "Connect your data, choose a model, and get intelligent predictions in seconds."
        }

    # ========================================================
    # IMPORT ROUTES
    # ========================================================

    from app.routes.user import router as user_router
    from app.routes.models import router as model_router
    from app.routes.admin import router as admin_router
    from app.routes.login import router as login_router
    from app.routes.logout import router as logout_router

    # ========================================================
    # LOGIN
    # ========================================================

    app.include_router(
        login_router,
        prefix="/login",
        tags=["Login"],
    )

    # ========================================================
    # LOGOUT
    # ========================================================

    app.include_router(
        logout_router,
        prefix="/logout",
        tags=["Logout"],
    )

    # ========================================================
    # USER
    # ========================================================

    app.include_router(
        user_router,
        prefix="/user",
        tags=["User"],
    )

    # ========================================================
    # MODEL
    # ========================================================

    app.include_router(
        model_router,
        prefix="/model",
        tags=["Model"],
    )

    # ========================================================
    # ADMIN
    # ========================================================

    app.include_router(
        admin_router,
        prefix="/admin",
        tags=["Admin"],
    )

    return app