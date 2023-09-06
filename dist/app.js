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
Object.defineProperty(exports, "__esModule", { value: true });
const ChatConnection_js_1 = require("./ChatConnection.js");
const node_child_process_1 = require("node:child_process");
const SongRequestApplicationConnection_1 = require("./SongRequestApplicationConnection");
const Scraper_1 = require("./Scraper");
const prompts_1 = require("@inquirer/prompts");
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let channelName = '';
            do {
                channelName = yield (0, prompts_1.input)({ message: 'Type your channel name:' });
            } while (!channelName);
            const scraper = Scraper_1.Scraper.getInstance();
            yield scraper.init();
            const chatRoomId = yield scraper.getChannelChatRoomId(channelName);
            yield scraper.close();
            if (!chatRoomId)
                throw Error('invalid channel name');
            console.log('establishing chat connection');
            new ChatConnection_js_1.ChatConnection().init(chatRoomId);
            console.log('successfully established chat connection');
        }
        catch (error) {
            console.log('error during establishing chat connection');
            console.log(error);
            process.exit(1);
        }
        try {
            console.log('loading application connection');
            SongRequestApplicationConnection_1.SongReuqestApplicationConnection.getInctance().init();
            console.log('successfully loaded application connection');
        }
        catch (error) {
            console.log('error during loading application connection');
            console.log(error);
            process.exit(1);
        }
        try {
            console.log('loading application');
            (0, node_child_process_1.spawn)('serve -s build', { shell: true, cwd: './frontend' });
            console.log('successfully loaded application');
            console.log('\x1b[32m%s\x1b[0m', 'open http://localhost:3000/ in browser to use the app!');
        }
        catch (error) {
            console.log('error during loading application');
            console.log(error);
            process.exit(1);
        }
    });
}
init();
