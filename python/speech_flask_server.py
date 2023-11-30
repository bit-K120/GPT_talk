from flask import Flask, render_template, request, jsonify, redirect, url_for
from speech_detection import recognise_speech_from_mic
from flask_socketio import SocketIO  

app = Flask(__name__)
socketio = SocketIO(app)

@socketio.on('/get_data')
def handle_speech(data):
     recognise_speech_from_mic(socketio)
     with open("user_said.txt","r") as file:
            speech_text = file.read()  
     socketio.emit('new_speech', {'speech_text': speech_text})


if __name__ == '__main__':    
    socketio.run(app, debug=True, host='127.0.0.1', port=5000)