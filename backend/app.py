from flask import Flask
from flask_cors import CORS
from routes.chat_routes import chat_bp
from routes.mood_routes import mood_bp

app = Flask(__name__)
CORS(app)

# Register Blueprints
app.register_blueprint(chat_bp, url_prefix="/api/chat")
app.register_blueprint(mood_bp, url_prefix="/api/mood")

if __name__ == '__main__':
    app.run(debug=True)
