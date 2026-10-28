type TitleProps = {
    title: string
}

export function Title({title} : TitleProps){
    return(
        <div className="text-cyan-50">{title}</div>
    )
}