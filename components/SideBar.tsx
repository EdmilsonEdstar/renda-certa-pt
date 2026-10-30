import { ButtonAgreFam } from "./ButtonAgreFam";
import { ButtonTipoHabi } from "./ButtonTipoHabi";
import { SectionBox } from "./SectionBox";
import { TextBox } from "./TextBox";

export function SideBar() {
    // Agregado familiar de 1 a 4
    const niveisAgregado = [1, 2, 3, 4];
    
    // Tipologia de habitação de 0 a 4 (T0 a T4)
    const niveisHabitacao = [0, 1, 2, 3, 4];

    return (
        <aside className="flex flex-col gap-4">
            <SectionBox title="Agregado Familiar">
                <div className="grid grid-cols-4 gap-3">
                    {niveisAgregado.map((i) => (
                        <ButtonAgreFam key={i} count={i} />
                    ))}
                </div>
            </SectionBox>
                
            <SectionBox title="Rendimento líquido total do agregado">
                <TextBox />
            </SectionBox>

            <SectionBox title="Tipologia de habitação">
                {/* Ajusta o grid para 5 colunas se quiseres que T0 a T4 fiquem bem alinhados */}
                <div className="grid grid-cols-5">
                    {niveisHabitacao.map((x) => (
                        <ButtonTipoHabi key={x} count={x} />
                    ))}
                </div>
            </SectionBox>
        </aside>
    );
}