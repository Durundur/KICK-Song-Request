

interface TextWithIconProps{
    Icon?: JSX.Element,
    placeholder?: string,
    onClick: any
}

export function TextWithIcon({Icon, placeholder, ...props} : TextWithIconProps){
    return(
        <span {...props} className={`flex flex-row gap-${Icon && placeholder ? 2 : 0} items-center text-primaryColor font-semibold cursor-pointer hover:text-primaryColorHover `}>
            {Icon ? Icon : null}
            <span className="uppercase ">{placeholder}</span>
        </span>
    )
}