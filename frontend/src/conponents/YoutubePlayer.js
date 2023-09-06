
import YouTube from 'react-youtube';


export default function YoutubePlayer({videoId, handleRequestEnd}){
    return(
        <YouTube style={{width: '100%', height: '100%'}} onEnd={()=>handleRequestEnd()} className="aspect-video max-w-xl self-center" videoId={videoId} opts={{height: '100%', width: '100%', playerVars: {autoplay: 1, controls: 2}}} ></YouTube>
    )
}