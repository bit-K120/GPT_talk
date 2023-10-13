import speech_recognition as sr
import os


def recognise_speech_from_mic():
    recognizer = sr.Recognizer()
    if os.path.exists("user_said.txt"):
        os.remove("user_said.txt")
    with sr.Microphone(device_index=1) as source:
        # print("Adjusting for ambient noise...")
        # recognizer.adjust_for_ambient_noise(source, duration=5)
        print("listening...")
        audio = recognizer.listen(source, timeout=5, phrase_time_limit=5)
        print("finished listening.")
        recognition_source = "google"
        recognition_method = f"recognize_{recognition_source}"
        try: 
            if hasattr(recognizer, recognition_method):
                text = getattr(recognizer, recognition_method)(audio, language="en-GB")
                with open("user_said.txt", "w") as file:
                    file.write(text)
                return text 
            else:
                raise AttributeError(f"{type(recognizer).__name__} has no object '{recognition_method}' ")             
        except sr.UnknownValueError:
            print("googleが音を検知できませんでした。")
        except sr.RequestError as e:
            print("googleからテキストソースを取得できませんでした。")
