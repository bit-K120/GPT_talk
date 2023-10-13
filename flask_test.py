from flask import Flask, render_template, request, jsonify
from speech_detection import recognise_speech_from_mic
from main import main



def flask_main():
    
    app = Flask(__name__)
    
    @app.route('/chat', methods = ["GET", "POST"])
    def chat():
        if request.method == "POST":
            message = request.form["message"]
            return render_template("chat.html", message = message)
        return render_template("chat.html")
    app.run(host='127.0.0.1', port=8000, debug=True)

    @app.route('/get_data', methods = ['GET'])
    def get_data():
        with open("user_said.txt", "r") as file:
            user_input = file.read()
            print(user_input)
        data = {"message": user_input}
        return jsonify(data), 200

    @socketio.on('get_speech')
    def handle_speech(data):
    # Fetch the speech text (you might get this from your speech recognition function)
        with open("user_said.txt","r") as file:
            speech_text = file.read()  # Replace this with your actual speech text
        
        # Emit the speech text to the client
        socketio.emit('new_speech', {'speech_text': speech_text})
    
    socketio.run(app, debug=True, host='127.0.0.1', port=8000)


if __name__ == '__main__':
    flask_main()