import {ForwardIcon,BackwardIcon} from './Icons/index';
import TextWithIcon from './TextWithIcon'

export default function PlayerButtons({handlePlayerButtons}){
    return(
        <div className="flex flex-row gap-6 self-center">
            <TextWithIcon onClick={() => handlePlayerButtons('backward')} Icon={BackwardIcon}></TextWithIcon>
            <TextWithIcon onClick={() => handlePlayerButtons('forward')} Icon={ForwardIcon}></TextWithIcon>
        </div>
    )
}