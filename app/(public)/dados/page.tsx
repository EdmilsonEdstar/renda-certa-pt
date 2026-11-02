
import Link from "next/link";
import AppShell from "@/components/layout/AppShell";

const sources = [
  {
    number: "01",
    name: "Instituto Nacional de Estatística",
    acronym: "INE",
    description:
      "Fonte estatística oficial para indicadores relacionados com população, famílias, rendimentos e habitação.",
    url: "https://www.ine.pt/",
  },
  {
    number: "02",
    name: "Fontes públicas complementares",
    acronym: "DADOS",
    description:
      "Outras fontes institucionais poderão ser utilizadas quando disponibilizarem informação relevante para a análise territorial e habitacional.",
    url: "https://dados.gov.pt/",
  },
];

const indicators = [
  {
    number: "01",
    title: "Habitação",
    description:
      "Indicadores relacionados com o mercado habitacional e os valores de arrendamento.",
  },
  {
    number: "02",
    title: "Rendimentos",
    description:
      "Informação estatística utilizada para contextualizar a capacidade económica dos agregados.",
  },
  {
    number: "03",
    title: "Território",
    description:
      "Dados geográficos e territoriais que permitem organizar e comparar os municípios portugueses.",
  },
  {
    number: "04",
    title: "Acessibilidade",
    description:
      "Indicadores e cálculos que ajudam a explorar a relação entre rendimentos e custos de habitação.",
  },
];

export default function DadosPage() {
  return (
    <AppShell>
      <div className="py-14 md:py-20">

    
    {/* Introdução da página */}
    <section className="pb-12 pt-6">
      <div className="grid gap-10 border-b border-border pb-12 md:grid-cols-[1.2fr_0.8fr] md:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Centro de informação
          </p>

          <h1 className="mt-5 max-w-2xl text-4xl font-bold tracking-tight md:text-5xl animate-fade-up">
            De onde vêm os dados?
          </h1>
        </div>

        <div>
          <p className="text-base leading-8 text-muted-foreground">
            Conhece as fontes, os indicadores e os critérios utilizados
            pelo PT Rental Map para analisar a acessibilidade ao
            arrendamento em Portugal.
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="border-l-2 border-primary pl-5 py-2">
          <p className="text-3xl font-bold">01</p>
          <p className="mt-2 text-sm font-medium">Fontes de informação</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Origem dos dados utilizados
          </p>
        </div>

        <div className="border-l-2 border-primary pl-5 py-2">
          <p className="text-3xl font-bold">04</p>
          <p className="mt-2 text-sm font-medium">Dimensões de análise</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Habitação, rendimento, território e acessibilidade
          </p>
        </div>

        <div className="border-l-2 border-primary pl-5 py-2">
          <p className="text-3xl font-bold">100%</p>
          <p className="mt-2 text-sm font-medium">Transparência</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Metodologia e limitações identificadas
          </p>
        </div>
      </div>
    </section>


        {/* Princípios */}
        <section className="mt-20 grid gap-10 md:grid-cols-[1fr_1fr] md:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              O nosso compromisso
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight">
              A transparência faz parte da plataforma.
            </h2>
          </div>

          <div className="space-y-5 text-base leading-8 text-muted-foreground">
            <p>
              Os indicadores devem ser apresentados com contexto, unidade
              de medida, origem e referência temporal sempre que essa
              informação esteja disponível.
            </p>
            <p>
              A plataforma procura facilitar a leitura e comparação
              da informação, sem substituir as fontes oficiais nem
              apresentar estimativas como se fossem valores garantidos.
            </p>
          </div>
        </section>

        {/* Fontes */}
        <section className="mt-24">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Origem da informação
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight">
              Fontes de dados
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              A informação deve ter origem identificável e permitir
              consultar a entidade responsável pela sua publicação.
            </p>
          </div>

          <div className="mt-10 divide-y divide-border border-y border-border">
            {sources.map((source) => (
              <div
                key={source.number}
                className="grid gap-5 py-8 md:grid-cols-[70px_1fr_auto] md:items-center"
              >
                <span className="text-sm font-semibold text-primary">
                  {source.number}
                </span>

                <div>
                  <h3 className="text-lg font-semibold">
                    {source.name}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">
                    {source.description}
                  </p>
                </div>

                <a
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary transition-opacity hover:opacity-75"
                >
                  Consultar fonte
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Indicadores */}
        <section className="mt-24">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            O que analisamos
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight">
            Dimensões de análise
          </h2>
          <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
            A análise da acessibilidade ao arrendamento cruza diferentes
            dimensões para proporcionar uma visão mais abrangente da
            realidade habitacional.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {indicators.map((indicator) => (
              <div
                key={indicator.number}
                className="rounded-2xl border border-border bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
              >
                <span className="text-sm font-semibold text-primary">
                  {indicator.number}
                </span>
                <h3 className="mt-5 text-xl font-semibold">
                  {indicator.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {indicator.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Metodologia */}
        <section className="mt-24 grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Como interpretamos os resultados
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight">
              Dos dados à informação útil.
            </h2>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-7">
            <p className="leading-8 text-muted-foreground">
              Os indicadores podem ser organizados por município e
              relacionados com o perfil do agregado familiar definido
              pelo utilizador. Os cálculos de acessibilidade ajudam a
              explorar o peso potencial da habitação no rendimento
              disponível.
            </p>

            <div className="mt-6 border-t border-border pt-6">
              <p className="text-sm font-semibold text-foreground">
                Taxa de esforço
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                (Despesa mensal com habitação ÷ rendimento líquido mensal)
                × 100
              </p>
            </div>
          </div>
        </section>

        {/* Limitações */}
        <section className="mt-24 rounded-3xl border border-warning/20 bg-warning/5 p-7 md:p-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-warning">
            Importante
          </p>

          <h2 className="mt-4 text-2xl font-bold tracking-tight">
            O que deves ter em conta.
          </h2>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <p className="text-sm leading-7 text-muted-foreground">
              Os indicadores estatísticos podem ter períodos de referência
              diferentes e não representar necessariamente a situação
              atual de cada imóvel ou município.
            </p>

            <p className="text-sm leading-7 text-muted-foreground">
              O PT Rental Map é uma ferramenta de análise e exploração.
              Não apresenta anúncios, não garante disponibilidade de
              imóveis e não substitui aconselhamento financeiro.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-24 border-t border-border pt-12 text-center">
          <h2 className="text-2xl font-bold">
            Explora os dados no mapa.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
            Compara municípios e explora a relação entre habitação
            e rendimento em Portugal.
          </p>

          <Link
            href="/mapa"
            className="mt-7 inline-flex items-center gap-3 rounded-xl bg-primary px-7 py-4 text-sm font-semibold text-background transition-all duration-300 hover:-translate-y-1 hover:opacity-90"
          >
            Explorar mapa
            <span aria-hidden="true">↗</span>
          </Link>
        </section>
      </div>
    </AppShell>
  );
}
