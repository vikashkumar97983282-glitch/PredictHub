from app.schemas.model_schema import placement_data
import joblib
import pandas as pd


path = "app/models/random_forest_regressor.pkl"

model = joblib.load(path)


def placement_prediction(data):
    features = pd.DataFrame([
        {
            "cgpa":data.cgpa,
            "resume_score":data.resume_score}
    ])
    prediction = model.predict(features)[0]
    return prediction*100