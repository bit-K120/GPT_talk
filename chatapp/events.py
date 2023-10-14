from flask import request
from flask_socketio import emit
from .extensions import socketio


@socketio.on("connect")
def handle_connect():
    print("Client connected")


@socketio.on("speech_detected")
def handle_speech(data):
    print("speech_detected!")
    with open("user_said.txt", "r") as file:
        speech_text = file.read()
    print("speech about to be emitted!")
    socketio.emit("new_speech", {"speech_text": speech_text})
