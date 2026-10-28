import { SideBar } from "@/components/SideBar";
import { Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="p-5">
        <h3 className="pb-4 text-cyan-100 text-2xl font-extrabold tracking-tight flex items-center gap-2.5">
        <Sparkles className="w-6 h-6 text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]"/>
        Renda Certa PT
      </h3>
        <SideBar/>
    </div>
  );
}
