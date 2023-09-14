import YoutubePlayer from '../conponents/YoutubePlayer';
import PlayerButtons from '../conponents/PlayerButtons';
import SongsList from '../conponents/SongsList';
import {QueueControls} from '../conponents/QueueControls';
import {useRequestQueue} from '../hooks/useRequestQueue';
import LoadingSpinner from '../conponents/LoadingSpinner';
import { useState } from 'react';
import { ModalBox } from '../conponents/ModalBox/ModalBox';
import { RequestCriteria } from '../conponents/RequestCriteria/RequestCriteria';


export default function SongRequest() {
    const { songRequestStore, skipSong, isConnectionAlive, updateSongRequestStore, songRequestCriteria, setSongRequestCriteria  } = useRequestQueue();
    const [isVideoMode, setIsVideoMode] = useState<boolean>(false);
    const [isCriteriaSettingsOpen, setIsCriteriaSettingsOpen] = useState<boolean>(false);

    const handlePlayerButtons = (action: 'forward' | 'backward'): void => {
        if (action === 'forward') {
            skipSong();
        }
    }
    if(!isConnectionAlive) return (
        <div className='container mx-auto p-8 2xl:max-w-7xl flex flex-col text-center pt-40 gap-8'>
            <LoadingSpinner></LoadingSpinner>
        </div>)
    if (songRequestStore?.length === 0 && isConnectionAlive) return (
        <div className='container mx-auto p-8 2xl:max-w-7xl flex flex-col text-center pt-40 gap-8'>
            <p className='text-2xl'>The queue is empty add new request by typing on chat:</p>
            <p className='text-primaryColor text-2xl'>!sr add URL</p>
        </div>)
    return (
        <div className='container mx-auto p-8 2xl:max-w-7xl'>
            <div className='grid grid-cols-5 gap-4'>
                {
                    isVideoMode ? 
                    <div className={`flex flex-col gap-4 col-span-5`}> 
                        <YoutubePlayer handleRequestEnd={handlePlayerButtons} videoId={(songRequestStore[0]?.id)}></YoutubePlayer>
                        <PlayerButtons handlePlayerButtons={handlePlayerButtons}></PlayerButtons>
                    </div> : <div className={`flex flex-col gap-4 col-span-2`}> 
                        <YoutubePlayer handleRequestEnd={handlePlayerButtons} videoId={(songRequestStore[0]?.id)}></YoutubePlayer>
                        <PlayerButtons handlePlayerButtons={handlePlayerButtons}></PlayerButtons>
                    </div>
                }
                <div className='flex flex-col col-span-3 justify-between'>
                    <div className='flex flex-col '>
                        <p className='uppercase text-xs'>now playing</p>
                        <p className='line-clamp-1 font-thin text-4xl'>{songRequestStore[0]?.snippet?.title}</p>
                        <p className='text-md text-secondaryTextColor font-medium tracking-wide'>{songRequestStore[0]?.snippet?.channelTitle}</p>
                    </div>
                    
                    <p className='text-secondaryTextColor'>{`Added by: ${songRequestStore[0]?.requester}`}</p>
                </div>
            </div>
            <QueueControls setIsCriteriaSettingsOpen={setIsCriteriaSettingsOpen} updateVideoMode={()=>setIsVideoMode(!isVideoMode)} updateSongRequestStore={updateSongRequestStore} songRequestStore={songRequestStore}></QueueControls>
            <SongsList songRequestStore={songRequestStore}></SongsList>
            <ModalBox isVisible={isCriteriaSettingsOpen} updateIsVisible={setIsCriteriaSettingsOpen}>
                <RequestCriteria updateIsVisible={setIsCriteriaSettingsOpen} songRequestCriteria={songRequestCriteria} setSongRequestCriteria={setSongRequestCriteria}/>
            </ModalBox>
        </div>
    )
}


