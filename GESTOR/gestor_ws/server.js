const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const port = process.env.PORT || 5001;
const server = http.createServer(express);
const wss = new WebSocket.Server({ server })

wss.on('connection', function connection(ws) {
  console.log("new connection");
  ws.on('message', function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    })
  })
})

server.listen(port, '0.0.0.0', function () {
  console.log(`Server is listening on ${port}!`)
})