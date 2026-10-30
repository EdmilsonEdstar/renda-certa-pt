type SectionBoxProps = {
    children:React.ReactNode
    title: string
}

export function SectionBox({children, title} : SectionBoxProps) {
    return (
        <div className="py-4 px-6 border border-cyan-500/20 rounded-xl bg-slate-900/60 backdrop-blur-md shadow-[0_8px_32px_0_rgba(6,182,212,0.15)] hover:border-cyan-400/50 hover:shadow-[0_0_25px_rgba(34,211,238,0.3)] transition-all duration-300 ease-in-out">
            <div className="text-cyan-50 pb-2 text-sm">{title}</div>
            {children}
        </div>
    );
}
