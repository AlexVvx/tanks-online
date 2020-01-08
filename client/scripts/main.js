const serverUrl = 'ws://fast-cove-62764.herokuapp.com';
const ws = new WebSocket(serverUrl);

ws.onopen = function open() {
    ws.send('tanks data initial');
    runTanks();
};

ws.onmessage = function incoming(event) {
    console.log(event.data);
};


function runTanks() {
    ws.send('move tank');
}