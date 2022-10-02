import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import Chat from "./Chat";
import logo_image from "./images/logo_wbg.png";
import logo_anim from './images/animated_logo_trans.gif';
import logo_trans from './images/logo_trans.png';

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  // const [room, setRoom] = useState("");
  const [pageState, setPageState] = useState(1);
  const [arrival, setArrival] = useState('IAH');
  const [departure, setDeparture] = useState('IAH');
  const [roomState, setRoomState] = useState('wrong')
  // useEffect(() => {
  //   console.log('room is', room)
  // },[room])

  let room = "";

  // page state is working
  const incrementPageState = () => {
    setPageState(pageState + 1);
  }

  const decrementPageState = () => {
    setPageState(pageState - 1);
  }

  const onEnterUsername = (event) => {
    setUsername(event.target.value);
  }

  const onSetDeparture = async (event) => {
    setDeparture(event.target.value);
  }

  function onSetArrival(event) {
    setArrival(event.target.value);
  }

  function joinRoom() {
    room = departure + ' \u2794 ' + arrival;
    if (username !== "" && room !== "") {
      console.log(username, '-', room)
      socket.emit("join_room", room);
    }
    setRoomState(room)
    incrementPageState();
  };

  return (
    <div className="App">
      
      <div class="hasicon">
        <img src={logo_trans} class="icon" />
      </div>
      { pageState === 1 ? (
        <div className="joinChatContainer">
          <h1 className="home-heading">Tindair</h1> 
          <div>
             <img src={logo_anim} alt="this is big boi logo image" class="center"/>
          </div>
          <button className="button-main" onClick={incrementPageState}>Get Started</button>
        </div>
        ) : pageState === 2 ? (
        <div>
          <h3>Please enter a good name for you :)</h3>
          <input class="username-input" type="text" placeholder="Your name..." onChange={onEnterUsername}></input>
          <button className="button-main" onClick={incrementPageState}>Go</button>
        </div>)
        : pageState === 3 ? (
          <div className="airport-selection">
          <h3>Select your departure airport</h3>
          <div className="custom-select">
            <select className="selector" value={departure} onInput={onSetDeparture}>
              <option value="ABI">ABI</option>
              <option value="AMA">AMA</option>
              <option value="AUS">AUS</option>
              <option value="BPT">BPT</option>
              <option value="BRO">BRO</option>
              <option value="CLL">CLL</option>
              <option value="CRP">CRP</option>
              <option value="DAL">DAL</option>
              <option value="DFW">DFW</option>
              <option value="EAS">EAS</option>
              <option value="ELP">ELP</option>
              <option value="HRL">HRL</option>
              <option value="IAH">IAH</option>
              <option value="HOU">HOU</option>
              <option value="GRK">GRK</option>
              <option value="LAX">LAX</option>
            </select>
          </div>
          <button className="button-main sub" onClick={incrementPageState}>Next</button>
          </div>
      ) : pageState == 4 ? (
          <div>
          <h3>Select your arrival airport</h3>
          <select className="selector" value={arrival} onInput={onSetArrival}>
          <option value="ABI">ABI</option>
              <option value="AMA">AMA</option>
              <option value="AUS">AUS</option>
              <option value="BPT">BPT</option>
              <option value="BRO">BRO</option>
              <option value="CLL">CLL</option>
              <option value="CRP">CRP</option>
              <option value="DAL">DAL</option>
              <option value="DFW">DFW</option>
              <option value="EAS">EAS</option>
              <option value="ELP">ELP</option>
              <option value="HRL">HRL</option>
              <option value="IAH">IAH</option>
              <option value="HOU">HOU</option>
              <option value="GRK">GRK</option>
              <option value="LAX">LAX</option>
          </select>
          <button className="button-main sub" onClick={joinRoom}>Next</button>
        </div>
      ) : (<div>
            <Chat socket={socket} username={username} room={roomState} />
          </div>)}
    </div>
  );
}

export default App;
