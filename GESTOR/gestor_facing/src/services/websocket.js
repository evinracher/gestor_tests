import { w3cwebsocket as W3CWebSocket } from "websocket";

// const client = new W3CWebSocket('ws://localhost:5001');
// const client = new W3CWebSocket('ws://192.168.43.244:5001');
const client = new W3CWebSocket('ws://192.168.0.20:5001');

export const sendMessage = (message) => {
  client.send(JSON.stringify({
    type: "message",
    msg: message,
  }));
}

export const configureWS = (callback) => {
  client.onopen = () => {
    console.log('WebSocket Client Connected');
  };
  client.onmessage = (message) => {
    const dataFromServer = JSON.parse(message.data);
    console.log('got reply! ', dataFromServer);
    if (dataFromServer.type === "message") {
      callback(dataFromServer.msg)
    }
  };
}
