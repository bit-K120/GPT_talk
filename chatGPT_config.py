import os
from dotenv import load_dotenv
import openai
import time
from speech_detection import recognise_speech_from_mic
from tts_config import text_to_speech

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

def chat_GPT_chat():
    print("Hey, what's up!")
    text_to_speech("Hey, what's up!")

    while True:
        # マイクから取ってきたものを関数化
        user_input = recognise_speech_from_mic()
        if user_input:
            print(f"You:{user_input}")
            # exitまたはbyeで終了
            if user_input.lower() in ["exit", "bye","quit"]:
                text_to_speech("Good bye!")
                break
        # ChatGPTの設定
        response = openai.ChatCompletion.create(
            model = "gpt-3.5-turbo",
            messages = [{"role": "system", "content": "You are a friendly person."},
                        {"role": "system", "content": user_input}
            ],
            )              
        # ChatGPTから生成されたものから文字部分のみ抽出
        gpt_response = response.choices[0].message.content
        print(f"ChatGPT:{gpt_response}") 
        text_to_speech(gpt_response)
    time.sleep(2)