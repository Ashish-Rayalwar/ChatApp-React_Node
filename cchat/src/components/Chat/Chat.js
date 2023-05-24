import React, { useEffect, useState } from "react";
import socketIO from "socket.io-client";
import { user } from "../Join/Join";
import ReactScrollToBottom from "react-scroll-to-bottom"
import sendLogo from "../../images/send.png";
import "./Chat.css";
import Message from "../Message/Message";
import closeIcon from "../../images/closeIcon.png"

let socket;
const ENDPONT = "http://localhost:4500/";
// const ENDPONT = "https://chat-application-kb6g.onrender.com";
const Chat = () => {
  const [id, setId] = useState("");
  const [message, setMessage] = useState([])

  const send = () => {
    let message = document.getElementById("chatInput").value;
    socket.emit("message", { message, id });
    document.getElementById("chatInput").value = "";
  };
  useEffect(() => {
    socket = socketIO(ENDPONT, { transports: ["websocket"] });
    socket.on('connect', () => {
     
      setId(socket.id);
    });
    socket.emit('joined', { user });

    socket.on('welcome', (data) => {
      setMessage([...message, data])
      console.log(data.user, data.message);
    });
    socket.on('userJoined', (data) => {
      setMessage([...message, data])
      console.log(data.user, data.message);
    });


    
    return () => {
      socket.on('leave', (data) => {
        socket.emit('disconnect');
        console.log(data.user, data.message);
      });
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setMessage([...message, data])
      console.log(data.user, data.message, data.id);
    });
    return () => {
      socket.off()
    };
  }, [message]);

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header">
        <h1><spam style={{"color":"#FFB202"}}>chat</spam>app</h1>
       <a href="/"> <img src={closeIcon} alt="Close" /></a>
        </div>
        <ReactScrollToBottom className="chatBox">
      {
        message.map((item,index)=> <Message user={item.id===id ? '':item.user} message={item.message} classs={item.id===id ? 'right':'left'} />)
      }
        </ReactScrollToBottom>
        <div className="inputBox">
          <input keyPress={(event)=>event.key==="Enter" ? send() : null} type="text" id="chatInput" placeholder="send message" />
          <button onClick={send} className="sendBtn">
            <img src={sendLogo} alt="Send" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
