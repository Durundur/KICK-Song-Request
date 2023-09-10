import useWebSocket from 'react-use-websocket';
import { useState } from 'react';
import { getDurationInSeconds } from './../conponents/QueueControls';


const useRequestQueue = () => {
  const [songRequest, setSongRequest] = useState(JSON.parse(localStorage.getItem('songRequest')) || []);
  const [isConnectionAlive, setIsConnectionAlive] = useState(false);
  const [requestCriteriaSettings, setRequestCriteriaSettings] = useState(JSON.parse(localStorage.getItem('songRequestCriteria')) || {
    queueLimit: 20,
    maxVideoLen: {
        minutes: 20,
        seconds: 0,
    },
    minVideoViews: 1000
  })
  
  const { readyState, getWebSocket } = useWebSocket('ws://localhost:11080', {
    shouldReconnect: (closeEvent) => true,

    onMessage: async (e) => {
      if (songRequest.length < requestCriteriaSettings.queueLimit) {
        const newRequest = JSON.parse(e.data);

        const {statistics, contentDetails} = newRequest;
        const {minVideoViews, maxVideoLen} = requestCriteriaSettings;
        
        if(statistics.viewCount >= minVideoViews && getDurationInSeconds(contentDetails.duration) <= maxVideoLen.minutes*60 + maxVideoLen.seconds){
          const updatedSongRequest = [...songRequest, newRequest];
          updateSongRequest(updatedSongRequest);
        }
      }
    },

    onOpen: (e) => {
      setIsConnectionAlive(true);
      console.log('open', e)
    },

    onClose: (e) => {
      setIsConnectionAlive(false)
      console.log('close', e);
    },
    
    onError: (e) => console.log('error', e)
  })

  const skipSong = () => {
    const updatedSongRequest = [...songRequest];
    updatedSongRequest.shift();
    updateSongRequest(updatedSongRequest);
  }

  function updateSongRequest(updatedSongRequest){
    setSongRequest(updatedSongRequest);
    localStorage.setItem('songRequest', JSON.stringify(updatedSongRequest));    
  }


  return { songRequest, skipSong, isConnectionAlive, updateSongRequest, requestCriteriaSettings, setRequestCriteriaSettings }
}
export default useRequestQueue












