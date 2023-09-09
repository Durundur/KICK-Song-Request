import YoutubePlayer from './../conponents/YoutubePlayer';
import PlayerButtons from '../conponents/PlayerButtons';
import SongsList from '../conponents/SongsList';
import QueueControls from './../conponents/QueueControls';
import useRequestQueue from './../hooks/useRequestQueue';
import LoadingSpinner from '../conponents/LoadingSpinner';
import { useState } from 'react';
import { ModalBox } from '../conponents/ModalBox/ModalBox';

export default function SongRequest() {
    const { songRequest, skipSong, isConnectionAlive, updateSongRequest } = useRequestQueue();
    const [isVideoMode, setIsVideoMode] = useState(false);
    const handlePlayerButtons = (action) => {
        if (action === 'forward') {
            skipSong();
        }
    }
    if(!isConnectionAlive) return (
        <div className='container mx-auto p-8 2xl:max-w-7xl flex flex-col text-center pt-40 gap-8'>
            <LoadingSpinner></LoadingSpinner>
        </div>)
    if (songRequest?.length === 0 && isConnectionAlive) return (
        <div className='container mx-auto p-8 2xl:max-w-7xl flex flex-col text-center pt-40 gap-8'>
            <p className='text-2xl'>The queue is empty add new request by typing on chat:</p>
            <p className='text-primaryColor text-2xl'>!sr add URL</p>
        </div>)
    return (
        <div className='container mx-auto p-8 2xl:max-w-7xl'>
            <div className='grid grid-cols-5 gap-4 '>
                <div className={`flex flex-col gap-4 col-span-${isVideoMode ? 5 : 2}`}>
                    <YoutubePlayer isVideoMode={isVideoMode} handleRequestEnd={skipSong} videoId={(songRequest[0]?.id)}></YoutubePlayer>
                    <PlayerButtons handlePlayerButtons={handlePlayerButtons.bind(this)}></PlayerButtons>
                </div>
                <div className='flex flex-col col-span-3 justify-between'>
                    <div className='flex flex-col '>
                        <p className='uppercase text-xs'>now playing</p>
                        <p className='line-clamp-1 font-thin text-4xl'>{songRequest[0]?.snippet?.title}</p>
                        <p className='text-md text-secondaryTextColor font-medium tracking-wide'>{songRequest[0]?.snippet?.channelTitle}</p>
                    </div>
                    
                    <p className='text-secondaryTextColor'>{`Added by: ${songRequest[0]?.requester}`}</p>
                </div>
            </div>
            <QueueControls isVideoMode={isVideoMode} updateVideoMode={()=>setIsVideoMode(!isVideoMode)} updateSongRequest={updateSongRequest} songRequest={songRequest}></QueueControls>
            <SongsList songRequest={songRequest}></SongsList>
            <ModalBox></ModalBox>
        </div>
    )
}


