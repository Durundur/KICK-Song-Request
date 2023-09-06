"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatConnection = void 0;
const ws_1 = __importDefault(require("ws"));
const SongRequest_1 = require("./SongRequest");
require('dotenv').config();
class ChatConnection {
    static getInstance() {
        if (!this.instance) {
            this.instance = new ChatConnection();
        }
        return this.instance;
    }
    constructor() {
        this.chatRoomId = '';
        this.WEBSOCKET_URL_PARAMS = new URLSearchParams({
            protocol: "7",
            client: "js",
            version: "7.4.0",
            flash: "false",
        }).toString();
        this.WEBSOCKET_BASE_URL = process.env.WEBSOCKET_BASE_URL;
        this.socket = null;
    }
    init(chatRoomId) {
        this.socket = new ws_1.default(this.WEBSOCKET_BASE_URL + '?' + this.WEBSOCKET_URL_PARAMS);
        this.chatRoomId = chatRoomId;
        this.socket.on('open', this.connectToChatRoom.bind(this));
        this.socket.on("message", this.handleNewChatMessage.bind(this));
        this.socket.on("close", () => {
            console.log("Disconnected from server");
        });
        this.socket.on("error", (error) => {
            console.log(error);
        });
    }
    connectToChatRoom() {
        var _a;
        (_a = this.socket) === null || _a === void 0 ? void 0 : _a.send(JSON.stringify({ event: "pusher:subscribe",
            data: { auth: "", channel: `chatrooms.${this.chatRoomId}.v2` } }));
    }
    close() {
        var _a;
        (_a = this.socket) === null || _a === void 0 ? void 0 : _a.close();
    }
    handleNewChatMessage(message) {
        const { event, data } = JSON.parse(message.toString());
        if (event === "App\\Events\\ChatMessageEvent") {
            const chatMessage = JSON.parse(data);
            SongRequest_1.SongRequest.handleNewMessage(chatMessage);
        }
    }
}
exports.ChatConnection = ChatConnection;
