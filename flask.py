from flask import Flask, render_template, request, jsonify
from speech_detection import recognise_speech_from_mic



def flask_activate():
    
    app = Flask(__name__)

    @app.route('/', methods = ["GET"])
    def index_get():
        return render_template('index.html')

    @app.route('/get_data', methods = ['GET'])
    def get_data():
        with open("user_said.txt", "r") as file:
            user_input = file.read()
        data = {"message": user_input}
        return jsonify(data), 200


    @app.route('/', methods = ["POST"])
    def index_post():
        message = request.form["message"]
        return render_template("index.html", message = message)
    
    app.run(host='127.0.0.1', port=8000, debug=True)


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8000, debug=True)
