from flask import Blueprint, request
from controllers.mood_controller import save_mood

mood_bp = Blueprint("mood", __name__)

@mood_bp.route("/", methods=["POST"])
def mood():
    mood = request.get_json().get("mood")
    if not mood:
        return {"error": "Mood not provided"}, 400
    return save_mood(mood)
