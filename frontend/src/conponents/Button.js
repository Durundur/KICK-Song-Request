

export default function Button({children, ...props}){
    return(
        <button {...props} className="bg-sky-700 hover:bg-sky-800 active:bg-sky-900 focus:outline-none focus:ring focus:ring-sky-700 rounded-lg py-1 px-2 shadow-sm shadow-sky-800 font-medium">{children}</button>
    )
}