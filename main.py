from main_output_ChatGPT import AI_chat_GPT
from main_output_Mi7B import AI_chat_Mi7B
from chatapp.extensions import socketio

GPT_or_Mi7B = None

@socketio.on("connect")
def handle_connect():
    print("Client connected")

@socketio.on("chatGPT_Selected")
def handle_select_GPT(data):
    global GPT_or_Mi7B
    print("chatGPT_Selected!")
    GPT_or_Mi7B = "GPT"

@socketio.on("Mistral_7b_Selected")
def handle_select_Mi7B(data):
    global GPT_or_Mi7B
    print("chatGPT_Selected!")
    GPT_or_Mi7B = "Mi7B"


def main():
    global GPT_or_Mi7B
    print(GPT_or_Mi7B)
    if GPT_or_Mi7B == "GPT":
        AI_chat_GPT()
    elif GPT_or_Mi7B == "Mi7B":
        AI_chat_Mi7B()



