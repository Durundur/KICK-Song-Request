import useWebSocket from 'react-use-websocket';
import { useState } from 'react';

const useRequestQueue = () => {
  const [songRequest, setSongRequest] = useState(JSON.parse(localStorage.getItem('songRequest')) || []);
  const [isConnectionAlive, setIsConnectionAlive] = useState(false);
  const { readyState, getWebSocket } = useWebSocket('ws://localhost:11080', {
    shouldReconnect: (closeEvent) => true,
    onMessage: async (e) => {
      if (songRequest.length < 20) {
        const updatedSongRequest = [...songRequest, JSON.parse(e.data)]
        updateSongRequest(updatedSongRequest);
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

  const updateSongRequest = (updatedSongRequest) => {
    setSongRequest(updatedSongRequest)
    localStorage.setItem('songRequest', JSON.stringify(updatedSongRequest));
  }


  return { songRequest, skipSong, isConnectionAlive, updateSongRequest }
}
export default useRequestQueue












