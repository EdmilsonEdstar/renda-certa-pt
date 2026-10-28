import { Baby, User, Users, UsersRound } from "lucide-react";
import { Title } from "./Title";
import { ButtonAgreFam } from "./ButtonAgreFam";

export function SideBar() {
    return (
        <div className="py-2 px-4 border-1 border-cyan-400 rounded-md shadow-[0_0_20px_rgba(59,130,246,0.5)] bg-blue-500/10">
            {/* Alterado de <p> para <div> para corrigir o erro anterior de hidratação */}
            <div className="text-cyan-100 pb-2 text-sm">
                <Title title="Agregado Familiar" />
            </div>
            
            <div className="grid grid-cols-4 gap-3">
                {Array.from({ length: 4 }, (_, index) => {
                    const i = index + 1;
                    return <ButtonAgreFam key={i} count={i} />;
                })}
            </div>
        </div>
    );
}
