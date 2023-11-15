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
    navigator.mediaDevices.getUserMedia({ audio: true }) // getting input from a Media device, audio:true is for selecting audio device.   
      .then((stream) => {                                // ".then" is for if a a permission for the Media device is granted. The audio data will be stored in 
                                                       // the parameter "stream". 
        const newRecorder = new MediaRecorder(stream);  // "stream"を規定値MediaRecorderに入れながら、変数newRecorderを設定
        newRecorder.ondataavailable = e => {            //if a data is avaliable inside, the data will be stored in e 
          setAudioData(currentData => [...currentData, e.data]);  
          setAudioExtension(getExtension(e.data.type)); // 受け取った音声データの拡張子を取得
        };
        newRecorder.onstop = async () => {
            const audioBlob = new Blob(audioData);
            try {
              const transcript = await sendAudioToGoogleCloud(audioBlob);
              // Update your component's state or UI with the transcript
            } catch (error) {
              console.error("Error transcribing audio", error);
              // Handle errors and provide user feedback
            }
          };

          const sendAudioToGoogleCloud = async (audioBlob) => {
            // Convert Blob to a format accepted by Google API
            // Make an HTTP request to Google Cloud Speech-to-Text API with the audio data
            // Return the transcript received from the API
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
