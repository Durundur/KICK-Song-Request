import Websocket from 'ws';
import { SongRequest } from './SongRequest';
require('dotenv').config(); 


export class ChatConnection {
    private static instance: ChatConnection;
    private socket: Websocket | null;
    private chatRoomId: string = '';

    private readonly WEBSOCKET_URL_PARAMS = new URLSearchParams({
        protocol: "7",
        client: "js",
        version: "7.4.0",
        flash: "false",
    }).toString();
    private readonly WEBSOCKET_BASE_URL = process.env.WEBSOCKET_BASE_URL;
    
    public static getInstance(): ChatConnection{
        if(!this.instance){
            this.instance = new ChatConnection();
        }
        return this.instance;
    }

    constructor(){
        this.socket = null;
    }


    public init(chatRoomId: string): void{
        this.socket = new Websocket(this.WEBSOCKET_BASE_URL+'?'+this.WEBSOCKET_URL_PARAMS)
        this.chatRoomId = chatRoomId;

        this.socket.on('open', this.connectToChatRoom.bind(this))


        this.socket.on("message", this.handleNewChatMessage.bind(this))

        this.socket.on("close", () => {
            console.log("Disconnected from server");
        });

        this.socket.on("error", (error) => {
            console.log(error);
        });
    }
    
    private connectToChatRoom(): void {
        this.socket?.send(JSON.stringify({event: "pusher:subscribe",
        data: { auth: "", channel: `chatrooms.${this.chatRoomId}.v2` }}))
    }


    private close(): void{
        this.socket?.close();
    }

    private handleNewChatMessage(message: Websocket.RawData){
        const {event, data}  = JSON.parse(message.toString());
        if(event === "App\\Events\\ChatMessageEvent"){
            const chatMessage = JSON.parse(data);
            SongRequest.handleNewMessage(chatMessage);
        }
    }


}