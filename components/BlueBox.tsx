type BlueBoxProps = {
    children:React.ReactNode
}

export function BlueBox({children} : BlueBoxProps) {
    return (
        <div className="py-2 px-4 border-1 border-cyan-400 rounded-md shadow-[0_0_20px_rgba(59,130,246,0.5)] bg-blue-500/10">
            {children}
        </div>
    );
}
