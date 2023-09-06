namespace NodeJS {
  import { SongInfo, ChatMessage } from './types.d';
  interface ProcessEnv {
    WEBSOCKET_BASE_URL: string;
    YT_API_KEY: string;
  }
}



export interface ChatMessage {
  id: string,
  content: string,
  sender: {
    username: string,
    identity: {
      badges: {
        text: string
      }[]
    }
  }
}
export interface SongInfo {
  id: string,
  snippet: {
    title: string,
    thumbnails: {
      [size: string]: {
        url: string
      }
    },
    channelTitle: string
  },
  contentDetails: { duration: string },
  statistics: {
    viewCount: string,
    likeCount: string,
    favoriteCount: string,
    commentCount: string
  }
}

export interface NewRequest extends SongInfo {
  requester: string
}