import { SaveIcon } from "../Icons";
import TextWithIcon from "../TextWithIcon";

export function RequestCriteria({ requestCriteriaSettings, setRequestCriteriaSettings, updateIsVisible }) {
    const { queueLimit, maxVideoLen, minVideoViews } = requestCriteriaSettings;
    return (
        <>
            <div className='flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                    <label htmlFor={'queue-limit'}>Queue limit </label>
                    <input value={queueLimit} className='bg-backgroundColor pl-2 p-1 rounded-md border-primaryColor border-solid border-2 outline-none w-1/6 min-w-[6rem]' type={'number'} name={'queue-limit'} id={'queue-limit'}
                        onChange={(e) => {
                            setRequestCriteriaSettings((prevSettings) => {
                                return {
                                    ...prevSettings,
                                    queueLimit: parseInt(e.target.value)
                                }
                            })
                        }}
                    ></input>
                </div>

                <div className='flex flex-col gap-2'>
                    <label>Max video length</label>
                    <div className='flex flex-row gap-2'>
                        <div className="flex flex-col items-center">
                            <input value={maxVideoLen.minutes} min={0} max={100} id='max-video-len-minutes' type={'number'} name={'max-viedo-length-minutes'} className='w-1/12 min-w-[6rem] bg-backgroundColor pl-2 p-1 rounded-md border-primaryColor border-solid border-2 outline-none'
                                onChange={(e) => {
                                    setRequestCriteriaSettings((prevSettings) => {
                                        return {
                                            ...prevSettings,
                                            maxVideoLen: {
                                                ...prevSettings.maxVideoLen,
                                                minutes: parseInt(e.target.value)
                                            }
                                        }
                                    })
                                }}></input>
                            <label htmlFor='max-video-len-minutes'>minutes</label>
                        </div>

                        <div className="flex flex-col items-center">
                            <input value={maxVideoLen.seconds} min={0} max={60} type={'number'} id='max-video-len-seconds' name={'max-viedo-length-seconds'} className='w-1/12 min-w-[6rem] bg-backgroundColor pl-2 p-1 rounded-md border-primaryColor border-solid border-2 outline-none'
                                onChange={(e) => {
                                    setRequestCriteriaSettings((prevSettings) => {
                                        return {
                                            ...prevSettings,
                                            maxVideoLen: {
                                                ...prevSettings.maxVideoLen,
                                                seconds: parseInt(e.target.value)
                                            }
                                        }
                                    })
                                }}></input>
                            <label htmlFor='max-video-len-minutes'>seconds</label>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col gap-2'>
                    <label htmlFor='min-video-views'>Min video views</label>
                    <input value={minVideoViews} type="number" id={'min-video-views'} name={'min-video-views'} className='w-1/6 min-w-[6rem] bg-backgroundColor pl-2 p-1 rounded-md border-primaryColor border-solid border-2 outline-none'
                        onChange={(e) => {
                            setRequestCriteriaSettings((prevSettings) => {
                                return {
                                    ...prevSettings,
                                    minVideoViews: parseInt(e.target.value)
                                }
                            })
                        }}></input>
                </div>
            </div>
            <span className='self-end'>
                <TextWithIcon onClick={() => {
                    localStorage.setItem('songRequestCriteria', JSON.stringify(requestCriteriaSettings));
                    updateIsVisible(false);
                }} Icon={SaveIcon} placeholder={'save'}></TextWithIcon>
            </span>
        </>
    )
}
