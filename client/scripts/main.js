const serverUrl = 'ws://fast-cove-62764.herokuapp.com';
const devServerUrl = 'ws://127.0.0.1:5000';
const ws = new WebSocket(devServerUrl);
const tankMovementOffset = 5;
let myTank;

class Tank {
    constructor(name, width, height, beginX, beginY) {
        this.name = name;
        this.width = width;
        this.height = height;
        const canvasEl = document.querySelector('#canvas');
        this.canvasElWidth = 1000;
        this.canvasElHeight = 600;
        canvasEl.width = this.canvasElWidth;
        canvasEl.height = this.canvasElHeight;
        this.ctx = canvasEl.getContext('2d');
        this.ctx.strokeStyle = 'red';
        this.draw(beginX, beginY);
    }

    draw(beginX, beginY) {
        // const duloWidth = 10;
        // const duloLength = duloWidth * 4
        // this.ctx.strokeRect(beginX, beginY, this.width, this.height);
        // this.ctx.strokeRect(beginX + (this.width / 2) - duloWidth / 2,
        //     beginY + this.height, duloWidth, duloLength);
        const tank = document.createElement('img');
        tank.style.width = this.width;
        tank.style.height = this.height;
        tank.src = './client/assets/img/tankYellow.png';
        this.ctx.drawImage(tank, 200, 200);

    }

    move(x, y) {
        this.ctx.clearRect(0, 0, this.canvasElWidth, this.canvasElHeight);
        this.x = x;
        this.y = y;
        this.draw(x, y);
    }
}

ws.onopen = function open() {
    // ws.send('tanks data initial');
};

ws.onmessage = function incoming(event) {
    if (/^player/.test(event.data)) {
        myTank = new Tank(event.data, 50, 70, 50, 50);
        return;
    }

    let x, y;
    try {
        const players = JSON.parse(event.data);
        [x, y] = players[myTank.name];
        //TODO: draw other tanks
        myTank.move(+x, +y);
    }
    catch (e) {
        console.error('wrong data format received');
    }
};

document.addEventListener('keypress', (event) => {
    switch (event.keyCode) {
        case 97: ws.send([myTank.x - tankMovementOffset, myTank.y]); break;  // left
        case 119: ws.send([myTank.x, myTank.y - tankMovementOffset]); break;  // up
        case 100: ws.send([myTank.x + tankMovementOffset, myTank.y]); break;  // right
        case 115: ws.send([myTank.x, myTank.y + tankMovementOffset]); break;  // down
    }
});