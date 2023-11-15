import speech_recognition as sr
import os
import socketio


def recognise_speech_from_mic():
    recognizer = sr.Recognizer()
    if os.path.exists("user_said.txt"):
        os.remove("user_said.txt")
    with sr.Microphone(device_index=1) as source:
        # print("Adjusting for ambient noise...")
        # recognizer.adjust_for_ambient_noise(source, duration=5)
        print("listening...")
        audio = recognizer.listen(source, timeout=1, phrase_time_limit=1) #デバイスが音声を聴く部分
        print("finished listening.")
        recognition_source = "google"
        recognition_method = f"recognize_{recognition_source}"
        try:
            if hasattr(recognizer, recognition_method):
            text = getattr(recognizer, recognition_method)(audio, language="en-GB") #ここのaudio部分がブラウザーになればいい
            with open("user_said.txt", "w") as file:
                file.write(text)      #ここで音声ファイルの保存
            sio = socketio.Client()

            @sio.event
            def connect():
                print("Connected to the server")
                sio.emit("speech_detected", {"text": "speech_detected!"})
            sio.connect('http://localhost:5000')

        # else:
        #     raise AttributeError(f"{type(recognizer).__name__} has no object '{recognition_method}' ")
        except sr.UnknownValueError:
            print("googleが音を検知できませんでした。")
        except sr.RequestError as e:
            print("googleからテキストソースを取得できませんでした。")

recognise_speech_from_mic()
