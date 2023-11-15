import os
from dotenv import load_dotenv
import openai
import time
from speech_detection import recognise_speech_from_mic
from tts_config import text_to_speech

load_dotenv()
PERPLEXITY_API_KEY = os.getenv("PERPLEXITY_API_KEY")


def AI_chat_Mi7B():
    print("Hey, What's up!!")
    text_to_speech("Hey, What's up!!")

    while True:
        # マイクから取ってきたものを関数化
        user_input = recognise_speech_from_mic()
        if user_input:
            print(f"You:{user_input}")
            # exitまたはbyeで終了
            if user_input.lower() in ["終了", "さようなら","またね"]:
                text_to_speech("またね!")
                break
            # perplexityのメッセージ設定
        messages = [
    {
        "role": "system",
        "content": (
            "You are a friendly English teacher, and you need to "
            "engage in a friendly conversation with user."
            "Your response has to be less than 15 words."


        ),
    },
    {
        "role": "user",
        "content": (user_input),
    },
]
        # aiの設定

        # openaiを使う場合
        response = openai.ChatCompletion.create(
            model="mistral-7b-instruct",
            messages=messages,
            api_base="https://api.perplexity.ai",
            api_key=PERPLEXITY_API_KEY,   
        )
                                                        
                      
        # aiから生成されたものから文字部分のみ抽出
        gpt_response = response.choices[0].message.content
        print(f"AI:{gpt_response}") 
        text_to_speech(gpt_response)
    time.sleep(2)