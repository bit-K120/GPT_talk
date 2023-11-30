from flask import Flask
from .events import socketio
from flask_cors import CORS
from .routes import main 


def create_app():
    app = Flask(__name__)
    app.config["DEBUG"] = True
    app.config["SECRET_KEY"] = "secret"

    app.register_blueprint(main)

    # used to be .... socketio.init_app(app)
    CORS(app)
    socketio.init_app(app,cors_allowed_origins="*")
    return app