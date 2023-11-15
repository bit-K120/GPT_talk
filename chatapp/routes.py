from flask import Blueprint, render_template

main = Blueprint("main", __name__)

@main.route("/")
def index():
    return render_template("chat_1.html")

@main.route("/chat")
def chat():
    return render_template("chat.html")


