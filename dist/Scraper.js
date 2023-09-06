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
exports.Scraper = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
class Scraper {
    static getInstance() {
        if (!this.instance) {
            this.instance = new Scraper();
        }
        return this.instance;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.browser = yield puppeteer_1.default.launch({
                headless: "new"
            });
            const pages = yield this.browser.pages();
            this.page = pages[0];
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.browser)
                return;
            yield this.browser.close();
            this.browser = null;
            this.page = null;
        });
    }
    constructor() {
        this.browser = null;
        this.page = null;
    }
    getChannelChatRoomId(channelName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.page) {
                    yield this.page.goto(`https://kick.com/api/v2/channels/${channelName}/chatroom`);
                    yield this.page.content();
                    const chatRoomId = yield this.page.evaluate(() => {
                        try {
                            return JSON.parse(document.body.innerText).id;
                        }
                        catch (e) {
                            return "";
                        }
                    });
                    return chatRoomId;
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.Scraper = Scraper;
