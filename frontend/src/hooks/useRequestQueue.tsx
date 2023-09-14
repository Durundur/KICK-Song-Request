import useWebSocket from 'react-use-websocket';
import { useState } from 'react';
import { getDurationInSeconds } from '../conponents/QueueControls';
import { SongRequestType, RequestCriteriaSettingsType } from '../types/Types';



export const useRequestQueue = () => {
  const [songRequestStore, setSongRequestStore] = useState<SongRequestType[]>(JSON.parse(localStorage.getItem('songRequestStore') || '') || []);
  const [songRequestCriteria, setSongRequestCriteria] = useState<RequestCriteriaSettingsType>(JSON.parse(localStorage.getItem('songRequestCriteria') || '') || {
    queueLimit: 20,
    maxVideoLen: {
        minutes: 20,
        seconds: 0,
    },
    minVideoViews: 1000
  })
  
  const { readyState } = useWebSocket('ws://localhost:11080', {
    shouldReconnect: (closeEvent) => true,

    onMessage: async (e) => {
      if (songRequestStore.length < songRequestCriteria.queueLimit) {
        const newRequest: SongRequestType = JSON.parse(e.data);

        const {statistics, contentDetails} = newRequest;
        const {minVideoViews, maxVideoLen} = songRequestCriteria;
        
        if(parseInt(statistics.viewCount) >= minVideoViews && getDurationInSeconds(contentDetails.duration) <= maxVideoLen.minutes*60 + maxVideoLen.seconds){
          const updatedSongRequest = [...songRequestStore, newRequest];
          updateSongRequestStore(updatedSongRequest);
        }
      }
    },

    onOpen: (e) => {
      console.log('open', e)
    },

    onClose: (e) => {
      console.log('close', e);
    },
    
    onError: (e) => console.log('error', e)
  })


  const skipSong = () => {
    const updatedSongRequestStore = [...songRequestStore];
    updatedSongRequestStore.shift();
    updateSongRequestStore(updatedSongRequestStore);
  }

  const updateSongRequestStore = (updatedSongRequest: SongRequestType[]) => {
    setSongRequestStore(updatedSongRequest);
    localStorage.setItem('songRequestStore', JSON.stringify(updatedSongRequest));    
  }

  const isConnectionAlive = readyState !== 1 ? false : true;
  return { songRequestStore, skipSong, isConnectionAlive, updateSongRequestStore, songRequestCriteria, setSongRequestCriteria }
}













