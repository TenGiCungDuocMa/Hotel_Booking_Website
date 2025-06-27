from fastapi import FastAPI
from pydantic import BaseModel
from multilingual_pipeline import BERTMultilingualPipeline

app = FastAPI()
pipeline = BERTMultilingualPipeline()

class Review(BaseModel):
    text: str

@app.post("/analyze")
def analyze_review(data: Review):
    return pipeline.predict(data.text)
