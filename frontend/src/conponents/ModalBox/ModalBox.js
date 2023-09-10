import { CloseIcon} from './../Icons';
import TextWithIcon from '../TextWithIcon';

export function ModalBox({isVisible, updateIsVisible, children}){
    if(!isVisible) return(null)
    return(
        <div className={'mx-auto container w-1/4 bg-[#2e3136] text-white fixed rounded-lg top-0 left-1/2 -translate-x-1/2 my-20 p-6'}>
            <div className='flex flex-col gap-4'> 
                <span className='self-end'>
                    <TextWithIcon  onClick={() => updateIsVisible(false)} Icon={CloseIcon}></TextWithIcon>
                </span>
                {children}
            </div>
        </div>
    )
}