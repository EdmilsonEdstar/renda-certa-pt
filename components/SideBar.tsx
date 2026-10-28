import { Baby, User, Users, UsersRound } from "lucide-react";
import { Title } from "./Title";
import { ButtonAgreFam } from "./ButtonAgreFam";

export function SideBar() {
    return (
        <div className="py-2 px-4 border-1 border-cyan-400 rounded-md shadow-[0_0_20px_rgba(59,130,246,0.5)] bg-blue-500/10">
            <p className="text-cyan-100 pb-2 text-sm">
                <Title title="Agregado Familiar" />
            </p>
            
            {/* Os botões foram colocados aqui dentro da sua Grid */}
            <div className="grid grid-cols-4 gap-3">
                {Array.from({ length: 4 }, (_, index) => {
                    const i = index + 1; // Transforma o índice 0-3 em contagem 1-4
                    return <ButtonAgreFam key={i} count={i} />;
                })}
            </div>
        </div>
    );
}
