import React, {useState, useEffect} from "react";
import io from "socket.io-client"


const Dropdowns = ({onLanguageSelect}) => {   
    const [selectedAi, setselectedAi] = useState("-select-");
    const [selectedLanguage, setselectedLanguage] = useState("-select");
    const [selectedMode, setselectedMode] = useState("-select");
    const [socket,setSocket] = useState(null);
    const serverURL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";


    useEffect (() => {
        const newSocket = io(serverURL, {secure:true});
        setSocket(newSocket);

        return () => {
        if (newSocket.connected) {
            newSocket.disconnect();
            setSocket(null)
            }
        };

    },[]);

    const handleAiSelect = (ai) => {
         setselectedAi(ai);
    if (socket && socket.connected) {
        socket.emit("ai_select", ai);
        console.log("SENT ai_selected");
    } else {
        console.log("socket not connected");
    }
    };

    const handleLanguageSelect = (language) => {
        setselectedLanguage(language);
        if (socket){
            socket.emit("language_select", language);
            console.log("SENT language_selected")
        }
        if (language == "English") {
            onLanguageSelect("/chat_eng")
        }else if(language == "French"){
            onLanguageSelect("/chat_fr")
            }else if(language == "Japanese"){
                onLanguageSelect("/chat_jp")
            }
    };

    const handleModeSelect = (mode) => {
        setselectedMode(mode);
        if (socket){
            socket.emit("mode_select", mode);
            console.log("SENT mode_selected")
        }
    };

   return(
   
   <><div className="btn-group-1 d-inline-block">
           <p className="text-above-button-a custom-margin">Choose AI</p>
           <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ color: 'black' }}>
               {selectedAi}
           </button>
           <div className="dropdown-menu custom-dropdown-menu">
               <a className="dropdown-item" href="#" onClick={(e)=> {e.preventDefault(); handleAiSelect("chat GPT")}}>Chat GPT</a>
               <a className="dropdown-item" href="#" onClick={(e)=> {e.preventDefault(); handleAiSelect("Mistral 7B")}}>Mistral 7B</a>
           </div>
       </div><div className="btn-group-2 d-inline-block">
               <p className="text-above-button-b custom-margin">Language</p>
               <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ color: 'black' }}>
                   {selectedLanguage}
               </button>
               <div className="dropdown-menu">
                   <a className="dropdown-item" href="#"  onClick={(e)=>{e.preventDefault(); handleLanguageSelect("English")}}>English</a>
                   <a className="dropdown-item" href="#"  onClick={(e)=>{e.preventDefault(); handleLanguageSelect("French")}}>French</a>
                   <a className="dropdown-item" href="#"  onClick={(e)=>{e.preventDefault(); handleLanguageSelect("Japanese")}}>Japanese</a>
               </div>
           </div><div className="btn-group-3 d-inline-block">
               <p className="text-above-button-c custom-margin">Mode</p>
               <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ color: 'black' }}>
                   {selectedMode}
               </button>
               <div className="dropdown-menu">
                   <a className="dropdown-item" href="#"  onClick={(e)=>{e.preventDefault(); handleModeSelect("Voice Chat")}}>Voice Chat</a>
                   <a className="dropdown-item" href="#"  onClick={(e)=>{e.preventDefault(); handleModeSelect("Translate")}}>Translate(coming soon...)</a>
               </div>
           </div></>              
            
   );
};

export default Dropdowns;