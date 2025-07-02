from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
from underthesea import word_tokenize
from langdetect import detect

class BERTMultilingualPipeline:
    def __init__(self):
        # Load all models
        self.models = {
            'en': {
                'spam': self.load_model("models/spam_en_model"),
                'sentiment': self.load_model("models/sentiment_en_model"),
                'tokenizer': AutoTokenizer.from_pretrained("distilbert-base-uncased")
            },
            # 'vi': {
            #     'spam': self.load_model("models/spam_vi_model"),
            #     'sentiment': self.load_model("models/sentiment_vi_model"),
            #     'tokenizer': AutoTokenizer.from_pretrained("vinai/phobert-base", use_fast=False)
            # }
        }

    def load_model(self, model_path):
        return AutoModelForSequenceClassification.from_pretrained(model_path).eval()

    def preprocess(self, text, lang):
        if lang == 'vi':
            text = word_tokenize(text, format="text")
        return self.models[lang]['tokenizer'](text, return_tensors="pt", truncation=True, padding=True)

    def predict(self, text):
        try:
            lang = detect(text)
            lang = 'vi' if lang == 'vi' else 'en'
        except:
            lang = 'en'  # fallback

        # Predict spam
        inputs = self.preprocess(text, lang)
        with torch.no_grad():
            spam_outputs = self.models[lang]['spam'](**inputs)
        spam_probs = torch.nn.functional.softmax(spam_outputs.logits, dim=1).squeeze()
        is_spam = torch.argmax(spam_probs).item() == 1
        spam_conf = float(torch.max(spam_probs))

        result = {
            "language": lang,
            "is_spam": is_spam,
            "spam_confidence": round(spam_conf, 4)
        }

        # If not spam → sentiment analysis
        if not is_spam:
            with torch.no_grad():
                senti_outputs = self.models[lang]['sentiment'](**inputs)
            senti_probs = torch.nn.functional.softmax(senti_outputs.logits, dim=1).squeeze()
            sentiment = "positive" if torch.argmax(senti_probs).item() == 1 else "negative"
            senti_conf = float(torch.max(senti_probs))
            result.update({
                "sentiment": sentiment,
                "sentiment_confidence": round(senti_conf, 4)
            })

        return result
