import YouTube from 'react-youtube';

interface YoutubePlayerProps{
    videoId: string,
    handleRequestEnd: (action: 'forward' | 'backward') => void
}

export default function YoutubePlayer({videoId, handleRequestEnd}: YoutubePlayerProps){
    return(
        <YouTube style={{width: '100%', height: '100%'}} className={`aspect-video self-center `} videoId={videoId} opts={{height: '100%', width: '100%', playerVars: {autoplay: 1, controls: 1}}} ></YouTube>
    )
}   