
import {Browser, Page,} from 'puppeteer'
import puppeteer from 'puppeteer';

export class Scraper{
    private static instance: Scraper;
    private browser: Browser | null;
    private page: Page | null;

    static getInstance(){
        if(!this.instance){
            this.instance = new Scraper();
        }
        return this.instance;
    }

    public async init(): Promise<void>{
        this.browser = await puppeteer.launch({
            headless: "new"
        });
        const pages =  await this.browser.pages();
        this.page = pages[0];
    }

    public async close(): Promise<void> {
        if (!this.browser) return;
        await this.browser.close();
        this.browser = null;
        this.page = null;
      }

    constructor(){
        this.browser = null; 
        this.page = null;
    }

    public async getChannelChatRoomId(channelName: string): Promise<string | undefined>{
        try{
            if(this.page){
                await this.page.goto(`https://kick.com/api/v2/channels/${channelName}/chatroom`);
                await this.page.content();
                const chatRoomId = await this.page.evaluate(()=>{
                    try {
                        return JSON.parse(document.body.innerText).id;
                    } catch (e) {
                        return "";
                    }
                })
                return chatRoomId;
            }
        }catch(error){
            console.log(error);
        }
    }
}


