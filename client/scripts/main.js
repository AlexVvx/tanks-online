const serverUrl = 'ws://fast-cove-62764.herokuapp.com';
const devServerUrl = 'ws://127.0.0.1:5000';
const ws = new WebSocket(devServerUrl);

ws.onopen = function open() {
    ws.send('tanks data initial');
    runTanks();
};

ws.onmessage = function incoming(event) {
    console.log(event.data);
};


function runTanks() {
    const canvasEl = document.querySelector('#canvas');
    ws.send('move tank');
}