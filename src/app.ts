import { ChatConnection } from './ChatConnection.js';
import { spawn } from "node:child_process";
import { SongReuqestApplicationConnection } from './SongRequestApplicationConnection';
import { Scraper } from './Scraper';
import { input } from '@inquirer/prompts';


async function init(){
    try{
        let channelName = '';
        do{
            channelName = await input({message: 'Type your channel name:'});
        }while(!channelName)
        
        const scraper = Scraper.getInstance();
        await scraper.init();
        const chatRoomId = await scraper.getChannelChatRoomId(channelName);
        await scraper.close()
        if(!chatRoomId) throw Error('invalid channel name');
        console.log('establishing chat connection');
        new ChatConnection().init(chatRoomId);
        console.log('successfully established chat connection');
        
    }
    catch(error){
        console.log('error during establishing chat connection');
        console.log(error)
        process.exit(1)
    } 

    try{
        console.log('loading application connection');
        SongReuqestApplicationConnection.getInctance().init();
        console.log('successfully loaded application connection');
    }
    catch(error){
        console.log('error during loading application connection');
        console.log(error)
        process.exit(1)
    } 

    try{
        console.log('loading application');
        spawn('serve -s build', {shell: true, cwd: './frontend'})
        console.log('successfully loaded application');
        console.log('\x1b[32m%s\x1b[0m', 'open http://localhost:3000/ in browser to use the app!')
    }
    catch(error){
        console.log('error during loading application');
        console.log(error)
        process.exit(1)
    } 
}

init()
