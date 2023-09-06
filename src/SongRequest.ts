import axios from "axios";
import { ChatMessage, SongInfo, NewRequest } from './../types/types.d';
import { SongReuqestApplicationConnection } from './SongRequestApplicationConnection';

export class SongRequest {

    private static getVideoId(videoUrl: string) {
        const url = new URL(videoUrl)
        if (videoUrl.includes('=')) return url.searchParams.get('v');
        else if (videoUrl.includes('youtu.be')) return url.pathname.replace('/', '');
    }

    private static async getSongInfo(songUrl: string): Promise<SongInfo | null> {
        try {
            const videoId = this.getVideoId(songUrl);
            const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${process.env.YT_API_KEY}&fields=items(id,snippet(channelTitle,title,thumbnails(medium)),statistics,contentDetails(duration))&part=snippet,contentDetails,statistics`);
            return response.data.items[0];
        }
        catch (error) {
            console.error(error)
            return null;
        }
    }

    private static checkIfSongRequestMessage(message: ChatMessage): boolean {
        if (message.content.startsWith('!sr ')) return true;
        return false;
    }

    private static checkIfValidYtUrl(urlString: string): boolean {
        const pattern = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        if (urlString.match(pattern)) {
            return true;
        }
        return false;
    }

    static async handleNewMessage(chatMessage: ChatMessage): Promise<void> {
        try {
            if (this.checkIfSongRequestMessage(chatMessage)) {
                const splittedMessageContent = chatMessage.content.trim().split(' ');
                const command = splittedMessageContent[1];
                const commandContent = splittedMessageContent[2];
                const sender = chatMessage.sender.username;
                switch (command) {
                    case 'add': {
                        if (this.checkIfValidYtUrl(commandContent)) {
                            const songInfo = await this.getSongInfo(commandContent);
                            if (songInfo) {
                                SongReuqestApplicationConnection.getInctance().passRequestToApp({
                                    ...songInfo,
                                    requester: sender,
                                })
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
            console.log(error)
        }
    }
}