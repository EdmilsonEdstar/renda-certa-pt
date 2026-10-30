type BlueBoxProps = {
    children:React.ReactNode
}

export function BlueBox({children} : BlueBoxProps) {
    return (
        <div className="py-2 px-4 border border-blue-300/20 rounded-md bg-[rgba(59,130,246,0.5)]] bg-blue-500/10">
            {children}
        </div>
    );
}
