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
        allow_origins=["http://localhost:5173"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )


    ## routes 
    from app.routes.user import router as user_router

    app.include_router(user_router,tags=['user'])


    

    return app