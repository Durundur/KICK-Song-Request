import TextWithIcon from "./TextWithIcon";
import {AddIcon ,TrashIcon ,HistoryIcon ,ResizeIcon, SettingsIcon} from './Icons/index' 

export function getDurationInSeconds(isoDuration) {
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

export function QueueControls({ songRequest, updateSongRequest, updateVideoMode, setIsCriteriaSettingsOpen }) {

    function getQueueDurationInSeconds(songRequest) {
        return songRequest.reduce((totalDuration, song) => totalDuration + getDurationInSeconds(song?.contentDetails?.duration), 0);
    }


    function formatDuration(seconds) {
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
        <div className="flex flex-row mt-8 text-secondaryTextColor mb-4 justify-between">
            <div>
                <p>Queue {songRequest?.length} videos - {formatDuration(getQueueDurationInSeconds(songRequest))}</p>
            </div>
            <div className="flex flex-row gap-8">
                <TextWithIcon onClick={()=>updateVideoMode()}  Icon={ResizeIcon} placeholder={'switch player mode'}></TextWithIcon>
                <TextWithIcon Icon={SettingsIcon} onClick={()=>setIsCriteriaSettingsOpen(true)} placeholder={'request criteria'}></TextWithIcon>
                {/* <TextWithIcon Icon={AddIcon} placeholder={'add media'}></TextWithIcon>
                <TextWithIcon Icon={HistoryIcon} placeholder={'history'}></TextWithIcon> */}
                <TextWithIcon onClick={() => updateSongRequest([])} Icon={TrashIcon} placeholder={'remove all'}></TextWithIcon>
            </div>
        </div>
    )
}