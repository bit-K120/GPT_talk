from flask import request
from flask_socketio import emit
from .extensions import socketio
from main import main


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

@socketio.on("gpt_responded")
def handle_gpt(data):
    print("speech_detected!")
    with open("gpt_response.txt", "r") as file:
        gpt_input = file.read()
    print("gpt response about to be emitted!")
    socketio.emit("gpt_input", {"gpt_input": gpt_input})

@socketio.on("voice_recog_init")
def handle_voice_detect(data):
    print("voice recog initiated!")
    main()
