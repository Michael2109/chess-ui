import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Button} from "react-bootstrap";
import SockJS from "sockjs-client";
import { Stomp } from '@stomp/stompjs';

function App(): JSX.Element {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Button variant="primary" onClick={connect}>
          Test
        </Button>
      </header>


    </div>
  );
}
function connect(){
  const socket = new SockJS('http://127.0.0.1:8080/chess-websocket');

  const stompClient = Stomp.over(socket);
  stompClient.connect({}, function (frame: unknown) {

    console.log('Connected: ' + frame);
    stompClient.subscribe('/topic/greetings', function (greeting) {
      console.log("Successfully subscribed")
      console.log(greeting.body)
    });

    stompClient.send("/app/hello", {}, JSON.stringify({'name': "Michael"}));
  });
}


export default App;
