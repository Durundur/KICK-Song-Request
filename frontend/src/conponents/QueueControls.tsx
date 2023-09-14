import {TextWithIcon} from "./TextWithIcon";
import {AddIcon ,TrashIcon , HistoryIcon ,ResizeIcon, SettingsIcon} from './Icons/index' 
import { SongRequestType } from './../types/Types.d';

export function getDurationInSeconds(isoDuration: string) {
    const regex = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
    const matches = isoDuration.match(regex);

    if (!matches) {
        throw new Error('Invalid ISO 8601 duration format');
    }

    const [, hours, minutes, seconds] = matches;

    return (
        (hours ? parseInt(hours) * 3600 : 0) +
        (minutes ? parseInt(minutes) * 60 : 0) +
        (seconds ? parseInt(seconds) : 0)
    );
}

interface QueueControlsProps{
    setIsCriteriaSettingsOpen: (state:boolean) => void,
    updateVideoMode: () => void,
    updateSongRequestStore: (updatedSongRequestStore: SongRequestType[]) => void,
    songRequestStore: SongRequestType[]
}

export function QueueControls({ songRequestStore, updateSongRequestStore, updateVideoMode, setIsCriteriaSettingsOpen }: QueueControlsProps) {

    function getQueueDurationInSeconds(songRequestStore: SongRequestType[]) {
        return songRequestStore.reduce((totalDuration, song) => totalDuration + getDurationInSeconds(song?.contentDetails?.duration), 0);
    }


    function formatDuration(seconds: number){
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        const formattedDuration = [];
        if (hours > 0) {
            formattedDuration.push(`${hours} h`);
        }
        if (minutes > 0) {
            formattedDuration.push(`${minutes} m`);
        }
        if (remainingSeconds > 0) {
            formattedDuration.push(`${remainingSeconds} s`);
        }

        return formattedDuration.join(' ');
    }


    return (
        <div className="flex flex-wrap-reverse flex-row mt-8 text-secondaryTextColor mb-4 justify-between">
            <div>
                <p>Queue {songRequestStore?.length} videos - {formatDuration(getQueueDurationInSeconds(songRequestStore))}</p>
            </div>
            <div className="flex flex-row gap-8">
                <TextWithIcon onClick={()=>updateVideoMode()} Icon={<ResizeIcon/>} placeholder={'switch player mode'}></TextWithIcon>
                <TextWithIcon onClick={()=>setIsCriteriaSettingsOpen(true)} Icon={<SettingsIcon/>} placeholder={'request criteria'}></TextWithIcon>
                {/* <TextWithIcon Icon={AddIcon} placeholder={'add media'}></TextWithIcon>
                <TextWithIcon Icon={HistoryIcon} placeholder={'history'}></TextWithIcon> */}
                <TextWithIcon onClick={() => updateSongRequestStore([])} Icon={<TrashIcon/>} placeholder={'remove all'}></TextWithIcon>
            </div>
        </div>
    )
}