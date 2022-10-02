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

  // page state is working
  const incrementPageState = () => {
    setPageState(pageState + 1);
  }

  const decrementPageState = () => {
    setPageState(pageState - 1);
  }

  return (
    <div className="App">
      { pageState === 1 ? (
        <div className="joinChatContainer">
          <h2>Tindair</h2> 
          <button onClick={incrementPageState}>Get Started</button>
        </div>
        ) : pageState === 2 ? (
          <div>
          <h3>Select your airport</h3>
          <select className="selector" autocomplete="on">
            <option value="IAH">IAH</option>
            <option value="LAX">LAX</option>
            <option value="EAS">EAS</option>
          </select>
        </div>
        // <Chat socket={socket} username={username} room={room} />
      ) : (<div> final div </div>)}
    </div>
  );
}

export default App;
