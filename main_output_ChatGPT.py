import os
from dotenv import load_dotenv
import openai
import time
from speech_detection import recognise_speech_from_mic
from tts_config import text_to_speech

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")



def AI_chat_GPT():
    
    print("Hey, What's up!!")
    text_to_speech("Hey, What's up!!")

    while True:
        # マイクから取ってきたものを関数化
        with open("user_said.txt", "r") as file:
            user_input = file.read()
        if user_input:
            print(f"You:{user_input}")
            # exitまたはbyeで終了
            if user_input.lower() in ["終了", "さようなら","またね"]:
                text_to_speech("またね!")
                break
        # aiの設定
        response = openai.ChatCompletion.create(
            model = "gpt-3.5-turbo",
            messages = [{"role": "system", "content": "You are a friendly person"},
                        {"role": "system", "content": user_input}
            ]
        )
                                                        
                      
        # aiから生成されたものから文字部分のみ抽出
        gpt_response = response.choices[0].message.content
        print(f"AI:{gpt_response}") 
        text_to_speech(gpt_response)
    time.sleep(2)