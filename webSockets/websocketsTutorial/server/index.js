// based on
const WebSocket = require("ws")

const wsServer = new WebSocket.Server({ port: 8082 })

wsServer.on("connection", connection => {

  connection.on("message", clientData => {
    console.log("Client has sent us: ", clientData)
    connection.send(data.toUpperCase())
  })

  console.log('New client connected!')
  connection.on("close", () => {
    console.log("One client has disconnected")
  })
})

