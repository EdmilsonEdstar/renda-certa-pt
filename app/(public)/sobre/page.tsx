
import Link from "next/link";
import AppShell from "@/components/layout/AppShell";
import Card from "@/components/ui/Card";

const objectives = [
  {
    number: "01",
    title: "Explorar",
    description:
      "Consultar informação sobre a acessibilidade ao arrendamento nos municípios portugueses.",
  },
  {
    number: "02",
    title: "Simular",
    description:
      "Explorar cenários com diferentes rendimentos, agregados familiares e tipologias.",
  },
  {
    number: "03",
    title: "Comparar",
    description:
      "Analisar diferenças territoriais através de indicadores apresentados de forma consistente.",
  },
  {
    number: "04",
    title: "Compreender",
    description:
      "Conhecer as fontes, os indicadores e a metodologia utilizados na plataforma.",
  },
];

export default function SobrePage() {
  return (
    <AppShell>
      <div className="py-12 md:py-20">

        {/* Introdução e missão */}
        <section className="relative overflow-hidden rounded-3xl border border-primary/20 bg-surface px-7 py-12 md:px-12 md:py-16">
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative max-w-4xl">
            <span className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-primary">
              Sobre o projeto
            </span>

            <h1 className="mt-7 text-4xl font-bold tracking-tight md:text-6xl animate-fade-up">
              Compreender a habitação através dos dados.
            </h1>

            <p className="mt-7 max-w-3xl text-base leading-8 text-muted-foreground md:text-lg animate-fade-up [animation-delay:200ms]">
              O PT Rental Map é uma plataforma dedicada à análise da
              acessibilidade ao arrendamento em Portugal, que procura
              transformar informação territorial e habitacional em
              conhecimento mais claro e acessível.
            </p>

            <div className="mt-10 flex flex-wrap gap-4 animate-fade-up [animation-delay:400ms]">
              <Link
                href="/como-funciona"
                className="rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-background transition-all hover:opacity-90"
              >
                Conhecer a plataforma
              </Link>

              <Link
                href="/mapa"
                className="rounded-lg border border-border px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-surface-raised"
              >
                Explorar o mapa
              </Link>
            </div>
          </div>
        </section>

        {/* Problema e abordagem */}
        <section className="mt-20 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              O contexto
            </span>

            <h2 className="mt-4 text-3xl font-bold tracking-tight">
              Um problema que merece ser compreendido.
            </h2>

            <p className="mt-5 leading-8 text-muted-foreground">
              A informação sobre habitação, rendimentos e território
              encontra-se frequentemente dispersa por diferentes fontes.
              Esta dispersão pode dificultar a comparação entre municípios
              e a compreensão das diferenças de acessibilidade ao
              arrendamento.
            </p>
          </div>

          <div className="border-l-2 border-primary/40 pl-7">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              A nossa abordagem
            </span>

            <h2 className="mt-4 text-3xl font-bold tracking-tight">
              Tornar os dados mais claros e úteis.
            </h2>

            <p className="mt-5 leading-8 text-muted-foreground">
              A plataforma pretende reunir indicadores e ferramentas de
              exploração territorial, permitindo analisar cenários e
              comparar municípios de uma forma visual, acessível e
              estruturada.
            </p>
          </div>
        </section>

        {/* Objetivos */}
        <section className="mt-24">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                O que nos orienta
              </span>

              <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                Os objetivos do projeto.
              </h2>
            </div>

            <p className="max-w-md leading-7 text-muted-foreground">
              Quatro dimensões que orientam a experiência e o desenvolvimento
              do PT Rental Map.
            </p>
          </div>

          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {objectives.map((item) => (
              <div
                key={item.number}
                className="group border-t border-border py-6 transition-colors duration-300 hover:border-primary"
              >
                <span className="text-3xl font-bold text-primary/50">
                  {item.number}
                </span>

                <h3 className="mt-6 text-xl font-semibold">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Âmbito e responsabilidade */}
        <section className="mt-24">
          <Card className="p-7 md:p-10">
            <div className="grid gap-8 md:grid-cols-[0.7fr_1.3fr]">
              <div>
                <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                  Transparência
                </span>

                <h2 className="mt-4 text-2xl font-bold">
                  Âmbito e responsabilidade.
                </h2>
              </div>

              <div>
                <p className="leading-8 text-muted-foreground">
                  O PT Rental Map é um projeto de análise e visualização
                  de dados. Não é um portal de anúncios imobiliários,
                  não garante a disponibilidade de imóveis e não constitui
                  uma avaliação de crédito nem aconselhamento financeiro
                  ou jurídico.
                </p>

                <p className="mt-5 leading-8 text-muted-foreground">
                  Os resultados dependem da qualidade, cobertura temporal
                  e disponibilidade das fontes de informação utilizadas.
                  Por isso, a origem e a data dos indicadores são elementos
                  fundamentais para interpretar os resultados.
                </p>

                <Link
                  href="/dados"
                  className="mt-6 inline-flex text-sm font-semibold text-primary transition-colors hover:opacity-80"
                >
                  Consultar fontes e metodologia
                </Link>
              </div>
            </div>
          </Card>
        </section>

        {/* Criador */}
        <section className="mt-24 grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-center">
          <div className="relative flex min-h-64 items-center justify-center overflow-hidden rounded-3xl border border-border bg-surface">
            <div className="absolute h-48 w-48 rounded-full bg-primary/10 blur-3xl" />

            <div className="relative text-center">
              <span className="text-5xl font-bold tracking-tight text-primary">
                EA
              </span>
              <p className="mt-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Criador do projeto
              </p>
            </div>
          </div>

          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Quem está por detrás
            </span>

            <h2 className="mt-4 text-3xl font-bold tracking-tight">
              Edmilson António.
            </h2>

            <p className="mt-5 leading-8 text-muted-foreground">
              O PT Rental Map é desenvolvido por Edmilson António como
              um projeto de exploração e visualização de dados, com foco
              na habitação e na realidade territorial portuguesa.
            </p>

            <a
              href="https://edmilsonportfolio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:opacity-80"
            >
              Conhecer o meu portefólio
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>

      </div>
    </AppShell>
  );
}
