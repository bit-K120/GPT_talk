from flask import Flask, render_template, request, redirect, url_for
from flask_socketio import SocketIO  
from speech_detection import recognise_speech_from_mic
import threading


def flask_main():
    
    app = Flask(__name__)
    app.secret_key = "1234"
    socketio = SocketIO(app)

    @app.route('/', methods=["GET","POST"])
    def index():
        if request.method == "POST":
            return redirect(url_for("chat"))
        return render_template("index.html")
            
    @app.route('/chat', methods=["GET"])
    def chat():
        if request.method == "POST":
            message = request.form["message"]
            return render_template("chat.html", message=message)
        return render_template("chat.html")


    @socketio.on('speech_detected')
    def handle_speech(data):
        with open("user_said.txt","r") as file:
            speech_text = file.read()  
    
    # thread = threading.Thread(target=recognise_speech_from_mic, args=(socketio,))
    # thread.start()

    socketio.run(app, debug=True, host='127.0.0.1', port=8000)



if __name__ == '__main__':
    flask_main()
    