"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SongRequest = void 0;
const axios_1 = __importDefault(require("axios"));
const SongRequestApplicationConnection_1 = require("./SongRequestApplicationConnection");
class SongRequest {
    static getVideoId(videoUrl) {
        const url = new URL(videoUrl);
        if (videoUrl.includes('='))
            return url.searchParams.get('v');
        else if (videoUrl.includes('youtu.be'))
            return url.pathname.replace('/', '');
    }
    static getSongInfo(songUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const videoId = this.getVideoId(songUrl);
                const response = yield axios_1.default.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${process.env.YT_API_KEY}&fields=items(id,snippet(channelTitle,title,thumbnails(medium)),statistics,contentDetails(duration))&part=snippet,contentDetails,statistics`);
                return response.data.items[0];
            }
            catch (error) {
                console.error(error);
                return null;
            }
        });
    }
    static checkIfSongRequestMessage(message) {
        if (message.content.startsWith('!sr '))
            return true;
        return false;
    }
    static checkIfValidYtUrl(urlString) {
        const pattern = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        if (urlString.match(pattern)) {
            return true;
        }
        return false;
    }
    static handleNewMessage(chatMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.checkIfSongRequestMessage(chatMessage)) {
                    const splittedMessageContent = chatMessage.content.trim().split(' ');
                    const command = splittedMessageContent[1];
                    const commandContent = splittedMessageContent[2];
                    const sender = chatMessage.sender.username;
                    switch (command) {
                        case 'add': {
                            if (this.checkIfValidYtUrl(commandContent)) {
                                const songInfo = yield this.getSongInfo(commandContent);
                                if (songInfo) {
                                    SongRequestApplicationConnection_1.SongReuqestApplicationConnection.getInctance().passRequestToApp(Object.assign(Object.assign({}, songInfo), { requester: sender }));
                                }
                            }
                            break;
                        }
                        default: {
                            console.log('invalid command');
                        }
                    }
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.SongRequest = SongRequest;
