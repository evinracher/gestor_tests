import { w3cwebsocket as W3CWebSocket } from "websocket";

const WS_IP = process.env.REACT_APP_WS_IP || 'localhost';
const client = new W3CWebSocket(`ws://${WS_IP}:5001`);

export const sendList = (list) => {
  client.send(JSON.stringify({
    type: "message",
    list: list,
  }));
}

export const isOpen = () => {
  return client.readyState === client.OPEN;
}

export const configureWS = (callback) => {
  client.onopen = () => {
    console.log('WebSocket Client Connected');
  };
  client.onmessage = (message) => {
    const dataFromServer = JSON.parse(message.data);
    console.log('got reply! ', dataFromServer);
    if (dataFromServer.type === "message") {
      callback(dataFromServer.list)
    }
  };
}