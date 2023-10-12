from flask import Flask, render_template, request, jsonify

app = Flask(__name__)


@app.route('/', methods = ["GET"])
def index_get():
    return render_template('index.html')

@app.route('/get_data', methods = ['GET'])
def get_data():
    data = {"message": "Hello from Python"}
    return jsonify(data), 200


@app.route('/', methods = ["POST"])
def index_post():
    message = request.form["message"]
    return render_template("index.html", message = message)

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8000, debug=True)
