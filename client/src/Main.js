import React,{ useState, useEffect} from "react";
import "./index.css";
import AudioRecorder from "./AudioRecorder";

const Main = () => {

  return(
  // <!-- Main container  -->
    <div className="container">
{/* <!--  Message header section starts    --> */}
        <div className="msg-header">
            <div className="container1">
                <img src="user1.png" className="msgimg" alt="User"/>
                <div className="active ">
                    <p>User name</p>
                </div>
            </div>
        </div> 
{/* <!-- Message header section ends --> */}

{/* <!-- Chat inbox section starts --> */}
        <div className="chat-page">

            <div className="msg-inbox">

                <div className="chats">
                    <div className="msg-page">
    {/* <!-- Contains the incoming and outgoing messages --> */}
                        <div className="received-chats">
                            <div className="received-chats-img">
                                <img src="user2.png" alt="User_2"/>
                            </div>
                            <div className="received-msg">
                                <div className="received-msg-inbox">
                                    <p>Hi !! This is message from Riya . Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non quas nemo eum, earum sunt, nobis similique quisquam eveniet pariatur commodi modi voluptatibus iusto omnis harum illum
                                        iste distinctio expedita illo!</p>
                                    <span className="time">18:06 PM | July 24 </span>
                                </div>
                            </div>
                        </div>
                        {/* outgoing Message starts here */}
                        <div className="outgoing-chats">
                            <div className="outgoing-chats-img">
                                <img src="user1.png" alt="User_1" />
                            </div>
                            <div className="outgoing-msg">
                                <div className="outgoing-chats-msg">
                                    <p className="multi-msg">Hi riya , Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo nobis deleniti earum magni recusandae assumenda.
                                    </p>
                                    <p className="multi-msg">Lorem ipsum dolor sit amet consectetur.</p>
                                    <span className="time">18:30 PM | July 24 </span>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
                    
    {/* <!--  Message bottom section starts --> */}
                <div className="msg-bottom">
                    <div className="input-group"> {/*<!--to wrap the divs below-->*/}
                        <div className="input-group-append "> {/*apparently this is to append message too*/}
                            <AudioRecorder/> {/*ここにボタンを入れる*/}
                        </div>
                    </div>
                </div>
    {/* <!-- Message bottom section ends. --> */}
            </div>
        </div>
    </div>
  )
};

export default Main;