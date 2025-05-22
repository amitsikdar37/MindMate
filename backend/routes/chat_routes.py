from flask import Blueprint, request
from controllers.chat_controller import get_gemini_reply

chat_bp = Blueprint("chat", __name__)

@chat_bp.route("/", methods=["POST"])
def chat():
    data = request.get_json()
    message = data.get("message")
    if not message:
        return {"error": "No message provided"}, 400
    return get_gemini_reply(message)
