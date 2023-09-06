"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SongReuqestApplicationConnection = void 0;
const ws_1 = require("ws");
class SongReuqestApplicationConnection {
    static getInctance() {
        if (!this.instance) {
            this.instance = new SongReuqestApplicationConnection();
        }
        return this.instance;
    }
    constructor() {
        this.webSocketServer = null;
        this.webSocket = null;
    }
    init() {
        this.webSocketServer = new ws_1.WebSocketServer({ port: 11080 });
        this.webSocketServer.on('connection', (ws) => {
            this.webSocket = ws;
            ws.on('error', (erorr) => console.log(erorr));
            ws.on('close', () => {
                console.log('closed connection with app, open http://localhost:3000/ in browser or refresh');
            });
        });
    }
    passRequestToApp(message) {
        if (this.webSocket) {
            this.webSocket.send(JSON.stringify(message));
        }
        else {
            console.log('WebSocket connection not established yet.');
        }
    }
}
exports.SongReuqestApplicationConnection = SongReuqestApplicationConnection;
