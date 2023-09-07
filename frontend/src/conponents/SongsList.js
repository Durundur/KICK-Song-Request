import SongsListItem from "./SongsListItem";


export default function SongsList({songRequest}){

    return(
        <div className="flex flex-col">
            <div className="">
            {   
                songRequest?.map((song, index)=>{
                    if(index===0) return null
                    return <SongsListItem key={index} title={song?.snippet?.title} index={index} thumbnail_url={song?.snippet?.thumbnails?.medium?.url}></SongsListItem>
                })
            }
            </div>
        </div>
    )
}