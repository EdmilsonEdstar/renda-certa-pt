import { Baby, User, Users, UsersRound } from "lucide-react";
import { Title } from "./Title";
import { ButtonAgreFam } from "./ButtonAgreFam";
import { BlueBox } from "./BlueBox";
import { TextBox } from "./TextBox";

export function SideBar() {
    return (
        <div className="flex flex-col gap-4">

        <BlueBox>
            {/* Alterado de <p> para <div> para corrigir o erro anterior de hidratação */}
            <Title title="Agregado Familiar" />

            <div className="grid grid-cols-4 gap-3">
                {Array.from({ length: 4 }, (_, index) => {
                    const i = index + 1;
                    return <ButtonAgreFam key={i} count={i} />;
                })}
            </div>

        </BlueBox>
            
        <BlueBox>
            <Title title="Rendimento líquido total do agregado" />
            <TextBox />
        </BlueBox>

        </div>
    );
}
