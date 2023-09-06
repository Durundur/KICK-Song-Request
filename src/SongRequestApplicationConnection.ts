import { WebSocketServer, WebSocket } from "ws";
import { NewRequest } from './../types/types.d';

export class SongReuqestApplicationConnection {
    private webSocketServer: WebSocketServer | null;
    private webSocket: WebSocket | null;
    private static instance: SongReuqestApplicationConnection;

    public static getInctance(): SongReuqestApplicationConnection {
        if (!this.instance) {
            this.instance = new SongReuqestApplicationConnection();
        }
        return this.instance;
    }

    constructor() {
        this.webSocketServer = null;
        this.webSocket = null;
    }

    public init(): void {
        this.webSocketServer = new WebSocketServer({ port: 11080 });
        this.webSocketServer.on('connection', (ws) => {
            this.webSocket = ws;
            ws.on('error', (erorr) => console.log(erorr));
            ws.on('close', () => {
                console.log('closed connection with app, open http://localhost:3000/ in browser or refresh')
            })
        });
    }

    public passRequestToApp(message: NewRequest): void {
        if (this.webSocket) {
            this.webSocket.send(JSON.stringify(message));
        } else {
            console.log('WebSocket connection not established yet.');
        }
    }
} 