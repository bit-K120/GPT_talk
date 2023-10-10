import os
from dotenv import load_dotenv
import speech_recognition as sr
from gtts import gTTS
import openai
import time

load_dotenv()
osopenai.api_key = os.getenv("OPENAI_API_KEY")

def recognise_speech_from_mic():
    recognizer = sr.Recognizer()

    print("Say something!")
    with sr.Microphone(device_index=1) as source:
        print("Adjusting for ambient noise...")
        recognizer.adjust_for_ambient_noise(source, duration=5)
        print("listening...")
        audio = recognizer.listen(source)
        print("finished listening.")
        recognition_source = "google"
        recognition_method = f"recognize_{recognition_source}"
        try: 
            if hasattr(recognizer, recognition_method):
                text = getattr(recognizer, recognition_method)(audio)
                return text 
            else:
                raise AttributeError(f"{type(recognizer).__name__} has no object '{recognition_method}' ")             
        except sr.UnknownValueError:
            print("googleが音を検知できませんでした。")
        except sr.RequestError as e:
            print("googleからテキストソースを取得できませんでした。")


def text_to_speach(text):
    tts = gTTS(text=text, lang="en")
    tts.save("response.mp3")
    os.system("mpg123 response.mp3")

def chat_GPT():
    text_to_speach("Hey, what's up?")
    while True:
        user_input = recognise_speech_from_mic()
        if user_input:
            print(f"You:{user_input}")
            if user_input.lower() in ["exit", "bye"]:
                text_to_speach("Good bye!")
                break

        response = openai.Completion.create(
            message= {"role": "system", "content": "You are a friendly person."}, 
            engine = "gpt-3.5-turbo-4k",
            prompt = user_input,
            max_tokens=150
            )              

        gpt_response = response.choice[0].text.strip()
        print(f"ChatGPT:{gpt_response}") 
        text_to_speach(gpt_response)
    time.sleep(2)                
    


def main():
    user_text = recognise_speech_from_mic()
    if user_text:
        print(f"You said:{user_text}")
    chat_GPT()
    



if __name__ == '__main__':
    main()

