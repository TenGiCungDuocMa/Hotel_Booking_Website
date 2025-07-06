import joblib
import pandas as pd
from fastapi import FastAPI
from pydantic import BaseModel
from cancel_booking_rate_model import BookingInput
from multilingual_pipeline import BERTMultilingualPipeline

app = FastAPI(title="Hotel Booking AI API",
              description="Bộ đặc tả AI API cho trang web BookingOT",
              version="1.0")

pipeline = BERTMultilingualPipeline()

booking_cancel_model = joblib.load("models/booking_cancel_model.pkl")


class Review(BaseModel):
    text: str


@app.post("/analyze")
def analyze_review(data: Review):
    return pipeline.predict(data.text)

@app.post("/predict_cancelation")
def predict_cancelation(data: BookingInput):
    input_df = pd.DataFrame([data.model_dump()])
    prob = booking_cancel_model.predict_proba(input_df)[0][1]
    label = booking_cancel_model.predict(input_df)[0]
    return {
        "probability_of_cancellation": round(prob, 4),
        "prediction": int(label),
        "message": "Customers have the ability to cancel" if label == 1 else "Customers have the ability to reserve seats"
    }
