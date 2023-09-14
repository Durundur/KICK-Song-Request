export interface SongRequestType {
    id: string;
    snippet: {
      title: string;
      thumbnails: {
        medium: {
          url: string;
          width: number;
          height: number;
        };
      };
      channelTitle: string;
    };
    contentDetails: {
      duration: string;
    };
    statistics: {
      viewCount: string;
      likeCount: string;
      favoriteCount: string;
      commentCount: string;
    };
    requester: string;
  }


export interface RequestCriteriaSettingsType{
  queueLimit: number,
    maxVideoLen: {
        minutes: number,
        seconds: number,
    },
    minVideoViews: number
}