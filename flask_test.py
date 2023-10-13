from flask import Flask, render_template, request, jsonify
from speech_detection import recognise_speech_from_mic



def flask_main():
    
    app = Flask(__name__)
    
    @app.route('/', methods = ["GET"])
    def index_get():
        return render_template('index.html')

    app.run(host='127.0.0.1', port=8000, debug=True)


if __name__ == '__main__':
    flask_main()
