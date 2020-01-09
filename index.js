const WebSocket = require('ws');
const PORT = process.env.PORT || 5000
const responseRate = 500;

const wss = new WebSocket.Server({ port: PORT });

let players = {
  get length() {
    return Object.keys(players).length - 1;
  }
};

wss.on('connection', function connection(ws) {
  const newPlayerName = `player${players.length + 1}`
  players[newPlayerName] = [players.length * 20, players.length * 20];
  ws.send(newPlayerName);

  ws.on('message', function incoming(message) {
    // console.log('received: %s', message);
    const [x, y] = message.split(',');
    players[newPlayerName] = [x, y];
  });

  const responseInterval = setInterval(function () {
    ws.send(JSON.stringify(players));
  }, responseRate);

  ws.on('close', function close() {
    clearInterval(responseInterval);
    players[newPlayerName] = undefined;
  });
});
