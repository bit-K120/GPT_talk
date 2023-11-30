from flask import Blueprint, render_template, request

main = Blueprint("main", __name__)

@main.route("/")
def index():
    return render_template("chat_1.html")

@main.route("/chat")
def chat():
    return render_template("chat.html")

@main.route("/upload", methods=["POST"])
def upload_file():
    file= request.files["file"]
    file.save("/path/to/save" + user_said.txt)
    return "File uploaded successfully"

