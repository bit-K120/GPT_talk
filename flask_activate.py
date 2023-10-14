from flask import Flask, render_template, request, jsonify, redirect, url_for
import random
import json
from speech_detection import recognise_speech_from_mic
from flask_socketio import SocketIO  



def flask_main():
    
    app = Flask(__name__)
    # socketio = SocketIO(app)

    @app.route('/', methods = ["GET","POST"])
    def index():
        if request.method == "POST":
            return redirect(url_for("chat"))
        return render_template("index.html")
            
    @app.route('/chat', methods = ["GET", "POST"])
    def chat():
        
        if request.method == "POST":
            message = request.form["message"]
            return render_template("chat.html", message = message)
        return render_template("chat.html")
    
    @app.route("/call_from_ajax", methods = ["POST"])
    def callfromajax():
        if request.method == "POST":
            # ここにPythonの処理を書く
            try:
                with open("user_said.txt","r") as file:
                    speech_text = file.read()
           
            except Exception as e:
                message = str(e)
            dict = {"user_input":speech_text}      # 辞書
        return json.dumps(dict)     
        
    # ----ソケットここから-----
    # @socketio.on('speech_detected')
    # def handle_speech(data):
    #     with open("user_said.txt","r") as file:
    #         speech_text = file.read()  

    #     socketio.emit('new_speech', {'speech_text': speech_text})
    
    # socketio.run(app, debug=True, host='127.0.0.1', port=8000)
    # ----ソケットここまで----

    app.run(debug=True, host='127.0.0.1', port=8000)



if __name__ == '__main__':
    flask_main()
