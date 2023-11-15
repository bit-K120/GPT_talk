from flask import Flask, render_template


app = Flask(__name__)


@app.route("/", methods=["GET"])
def chat():
    return render_template("chat_1.html")


if __name__ == "__main__":
    app.run(debug=True, host="127.0.0.1", port=8000)
