import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [pageState, setPageState] = useState(1);
  const [arrival, setArrival] = useState(null);
  const [departure, setDeparture] = useState('LAX');

  // page state is working
  const incrementPageState = () => {
    setPageState(pageState + 1);
  }

  const decrementPageState = () => {
    setPageState(pageState - 1);
  }

  const onSetDeparture = (event) => {
    console.log(event);
    setDeparture(event.target.value);
    console.log(departure);
  }

  const componentDidUpdate = (prevProps) => {
    if(this.props.departure !== prevProps.departure) {
      setDeparture(this.props.departure);
    }
  }

  // const joinRoom = () => {
  //   if (username !== "" && room !== "") {
  //     socket.emit("join_room", room);
  //     setShowChat(true);
  //   }
  // };

  return (
    <div className="App">
      { pageState === 1 ? (
        <div className="joinChatContainer">
          <h2>Tindair</h2> 
          <div>
             <img src={'./images/logo_wbg.png'} alt="this is logo image" />
          </div>
          <button class="button-main" onClick={incrementPageState}>Get Started</button>
        </div>
        ) : pageState === 2 ? (
          <div>
          <h3>Select your departure airport</h3>
          <select class="form-control" className="selector" value={departure} onInput={onSetDeparture}>
            <option value="IAH">IAH</option>
            <option value="LAX">LAX</option>
            <option value="EAS">EAS</option>
          </select>
          <button class="button-main" onClick={incrementPageState}>Next</button>
          </div>
      ) : pageState == 3 ? (
          <div>
          <h3>Select your arrival airport</h3>
          <select class="form-control" className="selector" autocomplete="on">
            <option value="IAH">IAH</option>
            <option value="LAX">LAX</option>
            <option value="EAS">EAS</option>
          </select>
          <button class="button-main" onClick={incrementPageState}>Next</button>
        </div>
        // <Chat socket={socket} username={username} room={room} />
      ) : (<div> final div </div>)}
    </div>
  );
}

export default App;
