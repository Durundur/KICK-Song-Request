

export default function TextWithIcon({Icon, placeholder, ...props}){
    return(
        <span {...props} className="flex flex-row gap-2 items-center text-primaryColor font-semibold cursor-pointer hover:text-primaryColorHover ">
            <Icon/>
            <span className="uppercase ">{placeholder}</span>
        </span>
    )
}