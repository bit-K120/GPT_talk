import pygame.mixer
from google.cloud import texttospeech
import os
from dotenv import load_dotenv

load_dotenv()
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = os.getenv("GOOGLE_API_KEY")


def text_to_speech(gpt_response):
    # google text to speechのクライアントを起動
    client = texttospeech.TextToSpeechClient()
    # 発生する声の設定
    synthesis_input = texttospeech.SynthesisInput(text=gpt_response)
    voice = texttospeech.VoiceSelectionParams(
        language_code="en-GB",
        ssml_gender=texttospeech.SsmlVoiceGender.FEMALE
    )
    # 出力する音声ファイルの設定
    audio_config = texttospeech.AudioConfig(
        audio_encoding = texttospeech.AudioEncoding.MP3
    )
    # APIに接続
    response = client.synthesize_speech(
        input=synthesis_input,
        voice=voice,
        audio_config= audio_config)
    # 音声ファイルを保存
    with open("output.mp3", "wb") as out:
        out.write(response.audio_content)
    
    play_voice()

# 音声を生成するのと再生するのは別々だからplay_voiceで音声の再生も作る。
def play_voice():
    pygame.mixer.init()
    pygame.mixer.music.load("output.mp3")
    pygame.mixer.music.play()
    while pygame.mixer.music.get_busy():
        pygame.time.Clock().tick(10)
    # ファイルを消す前にアンロードさせる
    pygame.mixer.music.unload()
    # スピーチが起きる度に毎回output.mp3を消す
    if os.path.exists("output.mp3"):
        os.remove("output.mp3")

