import { useState } from 'react';
import { CloseIcon, SaveIcon } from './../Icons';
import TextWithIcon from '../TextWithIcon';

export function ModalBox(){
    const [isVisible, setIsVisible] = useState(true)
    if(!isVisible) return(<></>)
    return(
        <div className={'mx-auto container w-1/2 bg-[#2a2d33] text-white fixed rounded-lg top-0 left-1/2 -translate-x-1/2 my-20 p-6'}>
            <div className='flex flex-col gap-4'> 
                <span className='self-end'>
                    <TextWithIcon  onClick={() => setIsVisible(false)} Icon={CloseIcon}></TextWithIcon>
                </span>
                <div className='flex flex-col gap-4'>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor={'queue-limit'} >Queue limit </label>
                        <input className='bg-backgroundColor pl-2 p-1 rounded-md border-primaryColor border-solid border-2 outline-none w-1/6 min-w-[6rem]' type={'number'} name={'queue-limit'} id={'queue-limit'}></input>
                    </div>
                    
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='max-video-len' >Max video length</label>
                        <div className='flex flex-row gap-2'>
                            <input placeholder='minutes' min={0} max={10} id='max-video-len' type={'number'} name={'max-viedo-length-minutes'} className='w-1/12 min-w-[6rem] bg-backgroundColor pl-2 p-1 rounded-md border-primaryColor border-solid border-2 outline-none'></input>
                            <input placeholder='seconds' min={0} max={60} type={'number'} name={'max-viedo-length-seconds'} className='w-1/12 min-w-[6rem] bg-backgroundColor pl-2 p-1 rounded-md border-primaryColor border-solid border-2 outline-none'></input>
                        </div>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor='min-video-views'>Min video views</label>
                        <input type="number"  id={'min-video-views'} name={'min-video-views'}  className='w-1/6 min-w-[6rem] bg-backgroundColor pl-2 p-1 rounded-md border-primaryColor border-solid border-2 outline-none'></input>
                    </div>
                </div>
                <span className='self-end'>
                    <TextWithIcon Icon={SaveIcon} placeholder={'save'}></TextWithIcon>
                </span>
            </div>
        </div>
    )
}