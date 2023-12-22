import React, {useState} from "react";
import Navbar from "./Navbar";
import "./LP.css";
import { Link } from "react-router-dom";
import Dropdowns from "./Dropdowns";


const LP = () => {
  const [selectedLanguage, setSelectedLanguage ] = useState("/chat_eng")

  const handleLanguageSelect = (value) => {
    setSelectedLanguage(value)
  };

  return(
    <div>
   <Navbar/>
    <div className="container-fluid mt-4">
        <div className="row d-flex">
            <div className="left-section col">
                <img src="/talk.ai_logo.png" style={{ borderRadius: '0' }} alt="Talk.AI Logo" className="logo"/>
                <div className="dropdowns-container">
                    <Dropdowns onLanguageSelect={handleLanguageSelect}/>
                </div>
                <div className="btn-container">
                    <Link to= {selectedLanguage} className="btn btn-dark get-started-link">
                    Get Started</Link>
                    <p className="catch-phrase">Speak, Learn, Connect: Master New Languages, Open New Doors!</p>
                </div>
            </div>
            <div className="right-section col">
                <img src="/language_app_image.png" alt="Talk.AI Interface"/>
            </div>
        </div>
    </div> 
  </div>
  );
};

export default LP;
