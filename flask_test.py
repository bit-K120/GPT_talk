from flask import Flask, render_template
from flask_socketio import SocketIO  


app = Flask(__name__)
# socketio = SocketIO(app)


@app.route('/chat', methods = ["GET"])
def chat():
    try:
        return render_template("chat_1.html")
    except Exception as e:
        return str(e)

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=8000)
