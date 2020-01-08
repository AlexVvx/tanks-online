const WebSocket = require('ws');
const PORT = process.env.PORT || 5000

const wss = new WebSocket.Server({ port: PORT });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    ws.send('response: ' + message);
  });

  ws.send('something');

  let iteration = 0;
  setInterval(function () {
    const newCoordinates = `${iteration * 10}, ${iteration * 10}`;
    ws.send(newCoordinates);
    console.log('newCoordinates: ' + newCoordinates);
    iteration++;
  }, 2000);
});
