import React, { useState, useEffect, Fragment} from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import io from "socket.io-client";
import "./chat.css";

// 音声を取り込むプログラム

const RecordBtnFr = ({onAppendMessage}) => {
// Destructuring Assignment useSpeechRecognitionの関数を直接使えるようにする。
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const [socket,setSocket] = useState(null);



// サーバーの定義
  const serverURL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";



  useEffect(() => {
    const newSocket = io(serverURL)
    setSocket(newSocket)
    // socketに接続
    newSocket.on("response_to_react", (data) => {
      console.log("サーバーからgpt_responseを受け取りました:", data);
      processData(data); 
      playAiVoice(data);
    });

   return () => {
      newSocket.disconnect();
    };

  },[]);


// 音声取り込みの関数
  const startListening = () => SpeechRecognition.startListening({continuous:true, language:"fr-FR"});
  if (!browserSupportsSpeechRecognition) {
    return <span>ブラウザが音声認識未対応です</span>;
  }

  const processData = (data) => {
    const text = data.gpt_response
    const type = "received"
    console.log("処理中のデータ:", data.gpt_response)
    onAppendMessage(text, type)
  };

  const playAiVoice = (data) => {
    const audio = new Audio(`data:audio/mp3;base64,${data.text_to_speech_data}`);
    audio.play();
  };

  //メッセージフロントに送信
  const sendMessageToFrontEnd = () => {
    const text = transcript
    const type = "outgoing"
    onAppendMessage(text,type)
  };

  const sendReactInputToServer = () => {
    if (socket){
      socket.emit("user_input", transcript);
      console.log("SENT user_input")

    }
  }




// 以下JSX-----------------------------------------------------------
  return (
    <div id="react-speech-recognition">
      {!listening &&(
      <Fragment>
      <button type="button" onClick={() => {resetTranscript(); startListening();}}>
        Start Recording
      </button>
      </Fragment>
      )}
      {listening &&(
      <Fragment>
      <button type="button" className="btn-clicked" onClick={() => {SpeechRecognition.stopListening(); sendReactInputToServer(); sendMessageToFrontEnd();}}>
        End Recording
      </button>
      </Fragment>
      )}
    </div>
  );
};

export default RecordBtnFr;
