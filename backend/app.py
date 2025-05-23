from flask import Flask
from flask_cors import CORS
from routes.chat_routes import chat_bp
from routes.mood_routes import mood_bp
import os

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return 'Welcome to my Flask app!'

# Register Blueprints
app.register_blueprint(chat_bp, url_prefix="/api/chat")
app.register_blueprint(mood_bp, url_prefix="/api/mood")

if __name__ == '__main__':
    debug = os.getenv("FLASK_ENV") == "development"
    port = int(os.getenv("PORT", 5000))
    app.run(debug=debug, port=port)
