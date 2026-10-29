type TitleProps = {
    title: string
}

export function Title({title} : TitleProps){
    return(
        <div className="text-cyan-50 pb-2 text-sm">{title}</div>
    )
}