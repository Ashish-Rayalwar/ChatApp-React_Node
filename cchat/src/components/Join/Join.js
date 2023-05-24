import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import logo from "../../images/logo.png";
import "./Join.css";

let user;

const Join = () => {

const [name, setName] = useState("")

const sendUser = ()=>{
    user = document.getElementById("joinInput").value
    document.getElementById("joinInput").value = ""
}
  return (
    <div className="JoinPage">
    <div className="JoinContainer">
        <img src={logo} alt="logo" />
        <h1><spam style={{"color":"#FFB202"}}>chat</spam>app </h1>
        <input onChange={(event)=> setName(event.target.value)} placeholder="Enter Your Name" type="text" id="joinInput" />
        <Link onClick={(event)=>!name ?  (event.preventDefault(),alert("plz enter your name")):null} to="/chat" ><button onClick={sendUser}  className="joinbtn">Login In</button></Link>
    </div>
</div>
  )
}

export default Join
export {user}