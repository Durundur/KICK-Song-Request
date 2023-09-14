interface SongsListItemType{
    title: string,
    index: number,
    thumbnail_url: string
}

export default function SongsListItem({title, index, thumbnail_url}: SongsListItemType){
    return(
        <div className="border-t flex flex-row items-center p-3 last-of-type:border-b gap-4">
            <span>{`${index}.`}</span>
            <img className="aspect-video w-1/12" alt={title} src={thumbnail_url}></img>
            <p>{title}</p>
        </div>
    )
}