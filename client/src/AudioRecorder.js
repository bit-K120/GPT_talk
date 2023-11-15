import React,{ useState, useEffect} from "react";
import './index.css'

const AudioRecorder = () => {
  const [status, setStatus] = useState('init');
  const [recorder, setRecorder] = useState(null); //sets the recorder falsy by setting the state "null"
  const [audioData, setAudioData] = useState([]);
  const [audioExtension, setAudioExtension] = useState('');
// stateの記述!

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
        newRecorder.onstop = () => {                //録音が止まった時に起動する関数
          const audioBlob = new Blob(audioData);//データを保存する前にstateのaudioDataをすべてBlobに変換
          const url = URL.createObjectURL(audioBlob); //作成したBlobデータのURLを作成
          const a = document.createElement('a'); //aタグを作成
          a.href = url;  // aタグのhrefに先ほど作成したURLを設定
          a.download = 'recording${getExtension(audioBlob.type)}'; //aタグのダウンロード機能を設定し、ファイル名をrecording.extensionに。
          a.click();           //aタグをクリック
          URL.revokeObjectURL(url); // URLを空に
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
