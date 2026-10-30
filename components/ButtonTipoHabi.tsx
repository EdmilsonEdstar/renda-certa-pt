interface ButtonTipoHabiProps {
  count: number;
}

export function ButtonTipoHabi({ count }: ButtonTipoHabiProps) {
  const plus = count === 4 ? '+' : '';

  return (
    <div className="bg-cyan-500/5 border border-cyan-500/20 border-r-0 last:border-r first:rounded-l-xl last:rounded-r-xl hover:border-cyan-400/50 transition-all text-slate-300">
      <button className="w-full h-full flex flex-col items-center justify-center py-3 px-4 hover:text-white transition-all cursor-pointer focus-visible:outline-none">
        <span className="text-lg font-bold">T{count}{plus}</span>
      </button>
    </div>
  );
}