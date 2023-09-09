

export default function TextWithIcon({Icon, placeholder, ...props}){
    return(
        <span {...props} className={`flex flex-row gap-${Icon && placeholder ? 2 : 0} items-center text-primaryColor font-semibold cursor-pointer hover:text-primaryColorHover `}>
            {Icon ? <Icon/> : null}
            <span className="uppercase ">{placeholder}</span>
        </span>
    )
}