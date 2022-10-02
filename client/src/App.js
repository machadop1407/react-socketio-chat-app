import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

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
          <h3>Tindair</h3> 
          <button onClick={incrementPageState}>Get Started</button>
        </div>
        ) : pageState === 2 ? (
        <div>hey</div>
        // <Chat socket={socket} username={username} room={room} />
      ) : (<div> final div </div>)}
    </div>
  );
}

export default App;
