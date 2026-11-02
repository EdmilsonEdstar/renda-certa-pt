
import Link from "next/link";
import AppShell from "@/components/layout/AppShell";

export default function SobrePage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-[1200px] px-6 py-16 md:px-12 md:py-24">

        {/* Cabeçalho */}
        <section className="mb-16 max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
            Sobre o projeto
          </p>

          <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">
            Compreender a acessibilidade ao arrendamento em Portugal
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-white/70">
            O PT Rental Map é uma plataforma de análise territorial que
            procura tornar mais acessível a compreensão dos desafios
            associados ao arrendamento habitacional em Portugal.
          </p>
        </section>

        {/* Missão */}
        <section className="mb-12 grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-surface p-8">
            <h2 className="mb-4 text-xl font-semibold text-primary">
              A nossa missão
            </h2>

            <p className="leading-relaxed text-white/70">
              Disponibilizar uma ferramenta que permita explorar e
              compreender as diferenças territoriais na acessibilidade
              ao arrendamento, relacionando indicadores habitacionais
              com o rendimento dos agregados familiares.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-surface p-8">
            <h2 className="mb-4 text-xl font-semibold text-primary">
              O problema que procuramos compreender
            </h2>

            <p className="leading-relaxed text-white/70">
              O acesso à habitação apresenta desafios diferentes
              consoante o território e a capacidade económica de cada
              agregado. O projeto procura facilitar a análise dessas
              diferenças através de informação organizada e visual.
            </p>
          </div>
        </section>

        {/* Objetivos */}
        <section className="mb-16">
          <h2 className="mb-8 text-2xl font-bold text-white md:text-3xl">
            Objetivos do projeto
          </h2>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-surface p-6">
              <h3 className="mb-3 font-semibold text-primary">
                Explorar o território
              </h3>
              <p className="text-sm leading-relaxed text-white/70">
                Permitir a análise dos municípios portugueses através
                de uma representação geográfica interativa.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-surface p-6">
              <h3 className="mb-3 font-semibold text-primary">
                Relacionar rendimento e habitação
              </h3>
              <p className="text-sm leading-relaxed text-white/70">
                Facilitar a compreensão da relação entre os rendimentos
                dos agregados e os indicadores de arrendamento.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-surface p-6">
              <h3 className="mb-3 font-semibold text-primary">
                Promover transparência
              </h3>
              <p className="text-sm leading-relaxed text-white/70">
                Identificar as fontes, datas de referência e
                metodologias utilizadas nos indicadores.
              </p>
            </div>
          </div>
        </section>

        {/* Âmbito */}
        <section className="mb-16 rounded-2xl border border-white/10 bg-surface p-8 md:p-10">
          <h2 className="mb-4 text-2xl font-bold text-white">
            Âmbito e utilização
          </h2>

          <p className="leading-relaxed text-white/70">
            O PT Rental Map destina-se à exploração e análise de
            indicadores territoriais relacionados com a habitação
            e o arrendamento. As simulações são ferramentas
            exploratórias e não constituem aconselhamento financeiro,
            avaliação de crédito ou garantia de disponibilidade
            de imóveis.
          </p>
        </section>

        {/* Criador */}
        <section className="rounded-2xl border border-primary/20 bg-primary/5 p-8 md:p-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
            Criador do projeto
          </p>

          <h2 className="text-2xl font-bold text-white md:text-3xl">
            Edmilson António
          </h2>

          <p className="mt-4 max-w-2xl leading-relaxed text-white/70">
            O PT Rental Map é um projeto desenvolvido por Edmilson
            António, com o objetivo de explorar a utilização de dados
            territoriais e ferramentas digitais na compreensão dos
            desafios da habitação em Portugal.
          </p>

          <a
            href="https://edmilsonportfolio.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center rounded-lg bg-primary px-6 py-3 font-semibold text-background transition hover:brightness-110"
          >
            Visitar o meu portfólio ↗
          </a>
        </section>

        {/* Navegação */}
        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            href="/como-funciona"
            className="rounded-lg bg-primary px-6 py-3 font-semibold text-background transition hover:brightness-110"
          >
            Como funciona
          </Link>

          <Link
            href="/"
            className="rounded-lg border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white/5"
          >
            Voltar ao início
          </Link>
        </div>

      </div>
    </AppShell>
  );
}
