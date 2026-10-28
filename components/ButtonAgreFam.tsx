interface ButtonAgreFamProps {
    count: number;
  }
  
  export function ButtonAgreFam({ count }: ButtonAgreFamProps) {
    // Define o texto no singular ou plural com base na quantidade
    const label = count === 1 ? 'Pessoa' : 'Pessoas';
  
    return (
      <button className="flex flex-col items-center justify-center py-3 px-4 rounded-xl bg-cyan-500/5 border border-cyan-500/20 hover:border-cyan-400/50 transition-all text-slate-300">
        <span className="text-lg font-bold">{count}</span>
        <span className="text-[10px] text-slate-400 uppercase tracking-wider">
          {label}
        </span>
      </button>
    );
  }
  