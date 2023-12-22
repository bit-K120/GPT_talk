import React from 'react';
import ReactDOM from 'react-dom/client';
import ChatEng from './chat_components/ChatEng';
import ChatFr from './chat_components/ChatFr';
import ChatJp from './chat_components/ChatJp';
import LP from './LP_components/LP';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LP />} />
        <Route path="/chat_eng" element={<ChatEng />} />
        <Route path="/chat_fr" element={<ChatFr />} />
        <Route path="/chat_jp" element={<ChatJp />} />


      </Routes>
    </BrowserRouter>
  </React.StrictMode>
  </React.StrictMode>
);


