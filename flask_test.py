from flask import Flask, render_template
from flask_socketio import SocketIO  


app = Flask(__name__)
socketio = SocketIO(app)



@app.route('/chat', methods = ["GET"])
def chat():
    return render_template("chat.html")

socketio.run(app,debug=True, host='127.0.0.1', port=5000)


