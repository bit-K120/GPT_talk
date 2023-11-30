from main_output_ChatGPT import AI_chat_GPT
from main_output_Mi7B import AI_chat_Mi7B
from flask_activate import flask_main



def main():
    

    GPT_or_Mi7B = int(input("1: GPT, 2:Mi-7B"))
    if GPT_or_Mi7B == 1:
        AI_chat_GPT()
    elif GPT_or_Mi7B == 2:
        AI_chat_Mi7B()

if __name__ == '__main__':
    main()

