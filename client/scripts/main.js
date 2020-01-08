

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
    ws.send('move tank');
}


class Tank {
    constructor(width, height, beginX, beginY) {
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
        const duloWidth = 10;
        const duloLength = duloWidth * 4
        this.ctx.strokeRect(beginX, beginY, this.width, this.height);
        this.ctx.strokeRect(beginX + (this.width / 2) - duloWidth / 2,
            beginY + this.height, duloWidth, duloLength);
    }

    move(x, y) {
        this.ctx.clearRect(0, 0, this.canvasElWidth, this.canvasElHeight);
        this.draw(x, y);
    }

}

const myTank = new Tank(50, 70, 50, 50);
setTimeout(() => myTank.move(100, 100), 2000);