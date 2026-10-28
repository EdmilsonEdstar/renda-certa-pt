type TitleProps = {
    title: string
}

export function Title({title} : TitleProps){
    return(
        <p className="text-cyan-50">{title}</p>
    )
}