import os
import requests
from flask import jsonify
from dotenv import load_dotenv

load_dotenv()  

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

print("Loaded Gemini API key:", GEMINI_API_KEY)

def get_gemini_reply(user_message):
    url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"
    headers = {"Content-Type": "application/json"}
    
    prompt = (
        "You are MindMate, an AI mental health companion. "
        "Your tone is friendly, calming, and supportive. "
        "Use short paragraphs and provide a single answer and friendly emojis when appropriate."
        "You speak like a compassionate human who listens actively. "
        "Offer comfort, encouragement, and thoughtful suggestions. "
        "Avoid medical advice and instead guide the user gently with empathy. "
        "Remember the context user and chat accordingly keeping in mind thier previous chat question or feelings."
    )

    payload = {
        "contents": [
            {
                "parts": [
                    {"text": prompt},
                    {"text": f"User: {user_message}"}
                ]
            }
        ]
    }

    response = requests.post(f"{url}?key={GEMINI_API_KEY}", headers=headers, json=payload)

    if response.status_code == 200:
        try:
            reply = response.json()["candidates"][0]["content"]["parts"][0]["text"]
            return jsonify({"reply": reply})
        except (KeyError, IndexError):
            return jsonify({"error": "Gemini reply format error"}), 500
    else:
        return jsonify({"error": "Gemini API failed", "details": response.text}), 500
