
import Link from "next/link";
import AppShell from "@/components/layout/AppShell";

export default function HomePage() {
  return (
    <AppShell>
      {/* HERO */}
      <section className="relative isolate left-1/2 -ml-[50vw] w-screen overflow-hidden">
        {/* Fotografia de Lisboa */}
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center animate-slow-zoom"
          style={{
            backgroundImage: "url('/images/lisbon-hero.png')",
          }}
        />

        {/* Camada escura para garantir a leitura do texto */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#06111f]/95 via-[#06111f]/70 to-[#06111f]/20" />

        <div className="mx-auto grid min-h-[560px] max-w-[1440px] items-center px-6 py-20 md:grid-cols-2 md:px-12">
          <div className="max-w-2xl">
            <p className="mb-5 text-sm font-semibold uppercase tracking-wider text-primary">
              Habitação e acessibilidade em Portugal
            </p>

            <h1 className="animate-fade-up text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              Encontra o teu lugar em Portugal
            </h1>

            <p className="animate-fade-up [animation-delay:200ms] mt-6 max-w-lg text-base leading-relaxed text-white/80 md:text-lg">
              Analisa a acessibilidade ao arrendamento em todos os municípios,
              com base no teu rendimento.
            </p>

            {/* Botões */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/mapa"
                className="animate-fade-up [animation-delay:400ms] rounded-lg bg-primary px-6 py-3 font-semibold text-background transition hover:brightness-110"
              >
                Explorar mapa →
              </Link>

              <Link
                href="/como-funciona"
                className="animate-fade-up [animation-delay:550ms] rounded-lg border border-white/60 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Ver como funciona
              </Link>
            </div>
          </div>
        </div>

        {/* Indicadores */}
        <div className="border-t border-white/20 bg-[#06111f]/80 backdrop-blur-sm">
          <div className="mx-auto grid max-w-[1440px] gap-6 px-6 py-7 sm:grid-cols-3 md:px-12">
            <div>
              <p className="text-3xl font-bold text-primary">308</p>
              <p className="text-sm text-white/70">Municípios</p>
            </div>

            <div>
              <p className="text-3xl font-bold text-primary">2</p>
              <p className="text-sm text-white/70">Regiões Autónomas</p>
            </div>

            <div>
              <p className="font-semibold text-white">Dados do INE</p>
              <p className="text-sm text-white/70">
                Fontes oficiais e atualização periódica
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FUNCIONALIDADES */}
      <section className="bg-background px-6 py-20 md:px-12">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-12 max-w-2xl">
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Tudo o que precisas para analisar o arrendamento
            </h2>

            <p className="mt-4 text-base leading-relaxed text-white/70">
              Explora os dados, simula diferentes cenários e compara municípios
              para compreender melhor a acessibilidade à habitação em Portugal.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Cartão 1 */}
            <div className="rounded-2xl border border-white/10 bg-surface p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/50">
              <h3 className="text-lg font-semibold text-primary">
                Mapa interativo
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Explora os municípios portugueses e consulta indicadores de
                acessibilidade ao arrendamento.
              </p>
            </div>

            {/* Cartão 2 */}
            <div className="rounded-2xl border border-white/10 bg-surface p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/50">
              <h3 className="text-lg font-semibold text-primary">
                Dados fiáveis
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Consulta indicadores com fontes identificadas, datas de
                referência e metodologia transparente.
              </p>
            </div>

            {/* Cartão 3 */}
            <div className="rounded-2xl border border-white/10 bg-surface p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/50">
              <h3 className="text-lg font-semibold text-primary">
                Simulações
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Ajusta o rendimento do agregado e a tipologia para explorar
                diferentes cenários.
              </p>
            </div>

            {/* Cartão 4 */}
            <div className="rounded-2xl border border-white/10 bg-surface p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/50">
              <h3 className="text-lg font-semibold text-primary">
                Comparação nacional
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Compara municípios e identifica diferenças territoriais na
                acessibilidade à habitação.
              </p>
            </div>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
