const ws = require('ws');

const client = new ws('ws://localhost:3001');

// client.on('open', () => {
//   // Causes the server to print "Hello"
//   client.send('Hello');
// });

const express = require('express')
const app = express()
const port = 3002

app.get('/', (req, res) => {
  res.send('Hello World!')
  client.send('Hello');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})