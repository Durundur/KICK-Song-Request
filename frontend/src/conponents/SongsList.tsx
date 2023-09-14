import SongsListItem from "./SongsListItem";
import { SongRequestType } from "../types/Types";

export default function SongsList({songRequestStore}: {songRequestStore: SongRequestType[]}){

    return(
        <div className="flex flex-col">
            <div className="">
            {   
                songRequestStore?.map((song, index)=>{
                    if(index===0) return null
                    return <SongsListItem key={index} title={song?.snippet?.title} index={index} thumbnail_url={song?.snippet?.thumbnails?.medium?.url}></SongsListItem>
                })
            }
            </div>
        </div>
    )
}