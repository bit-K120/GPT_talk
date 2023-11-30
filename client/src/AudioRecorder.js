import React,{ useState, useEffect} from "react";
import './index.css'

const AudioRecorder = () => {
  const [status, setStatus] = useState('init');
  const [recorder, setRecorder] = useState(null); //sets the recorder falsy by setting the state "null"
  const [audioData, setAudioData] = useState([]);
  const [audioExtension, setAudioExtension] = useState('');
// stateの記述

  useEffect(() => {
    // Access the microphone and create a MediaRecorder instance
    navigator.mediaDevices.getUserMedia({ audio: true }) // メディアにアクセス   
      .then((stream) => {                               
        const newRecorder = new MediaRecorder(stream);  // "stream"を規定値MediaRecorderに入れながら、変数newRecorderを設定
        newRecorder.ondataavailable = e => {            //if a data is avaliable inside, the data will be stored in e 
          setAudioData(currentData => [...currentData, e.data]);  
          setAudioExtension(getExtension(e.data.type)); // 受け取った音声データの拡張子を取得
        };

        // レコードが終了したら以下の処理
        newRecorder.onstop = async () => {
          const audioBlob = new Blob(audioData, { type: 'audio/wav' }); // blobのファイル形式を確認
          try {
            const transcript = await sendAudioToGoogleCloud(audioBlob);//ここを定義しないといけない
            console.log(transcript); // Log or use the transcript as needed

            // Create a text file from the transcript
            const textBlob = new Blob([transcript], { type: 'text/plain' });
            await sendTextFileToServer(textBlob); // Function to send text file to the server
          } catch (error) {
            console.error("Error transcribing audio", error);
            // Handle errors and provide user feedback
          }
        };

        setRecorder(newRecorder); //（ようわからん）state内のRecorderをnewRecorderに設定
        setStatus('ready');    //statusをreadyに
      })
      .catch(error => {
        console.error("Error accessing the microphone", error);
      });
  },[]); // Empty array ensures this effect runs only once on mount

  const startRecording = () => {
    setStatus('recording');
    setAudioData([]); //AudioDataの初期化（いらなくない？）
    recorder && recorder.start(); //useEffectにてrecorderはnewRecorder(MediaRecorder(stream))に代入された、recorderの.startを利用
  };

  const stopRecording = () => {
    recorder && recorder.stop();
    setStatus('ready');
  };

  const getExtension = (audioType) => { //拡張子の取得
    let extension = 'wav';
    const matches = audioType.match(/audio\/([^;]+)/);
    if (matches) {
      extension = matches[1];
    }
    return '.' + extension;
  };

  const sendAudioToGoogleCloud = async (audioBlob) => {

  };


  // Function to send text file to the server
  const sendTextFileToServer = async (textBlob) => {
    const formData = new FormData();   //FormDataのObjectを作成
    formData.append('file', textBlob, 'transcript.txt'); //textBlobをtranscript.txtとしてFormDataに追加

    try {
      const response = await fetch('http://localhost:5000/upload', { // Replace with your server endpoint
        method: 'POST',
        body: formData   
      });  //formDataをサーバーに送る

      if (!response.ok) {
        throw new Error("Server response wasn't OK");
      }

      // Handle the response from the server
      // For example, you can log the response or use it in your UI
    } catch (error) {
      console.error('Error sending text file to server:', error);
      throw error;
    }
  };

  return (
    <div className="p-3">
      <div id="app">
        {status === 'ready' && (
          <button className="record-btn btn-danger" onClick={startRecording}>
            録音を開始する
          </button>
        )}
        {status === 'recording' && (
          <button className="record-btn btn-primary" onClick={stopRecording}>
            録音を終了する
          </button>
        )}
      </div>
    </div>
  );
};

export default AudioRecorder;
