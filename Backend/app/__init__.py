from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


def create_app() -> FastAPI:
    app = FastAPI(
    title="PredictHub API",
    description="Machine Learning Prediction API",
    version="1.0.0"
    )

    ### Cors middleware
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[
            "http://localhost:5173",
            "https://predicthub-lac.vercel.app"
            ],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    @app.get('/')
    def home():
        return "Connect your data, choose a model, and get intelligent predictions in seconds."

    ## routes 
    from app.routes.user import router as user_router
    from app.routes.models import router as model_router

    app.include_router(user_router,prefix="/user", tags=['user'])
    app.include_router(model_router,prefix="/model",tags=['model'])


    

    return app