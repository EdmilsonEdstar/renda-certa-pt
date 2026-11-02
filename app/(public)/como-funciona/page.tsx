
import Link from "next/link";
import AppShell from "@/components/layout/AppShell";
import Card from "@/components/ui/Card";

const steps = [
  {
    number: "01",
    title: "Define o agregado familiar",
    description:
      "Indica quantas pessoas compõem o teu agregado. Este contexto ajuda a enquadrar a análise habitacional.",
    detail: "Agregado familiar",
  },
  {
    number: "02",
    title: "Introduz o rendimento",
    description:
      "Indica o rendimento líquido mensal do agregado para perceberes o peso que uma renda pode representar.",
    detail: "Rendimento mensal líquido",
  },
  {
    number: "03",
    title: "Escolhe a tipologia",
    description:
      "Seleciona a tipologia habitacional que pretendes analisar, como T1, T2 ou T3.",
    detail: "Tipologia pretendida",
  },
  {
    number: "04",
    title: "Explora os municípios",
    description:
      "Consulta o mapa, observa os indicadores disponíveis e compara as diferenças entre municípios.",
    detail: "Exploração territorial",
  },
];

export default function ComoFuncionaPage() {
  return (
    <AppShell>
      <div className="py-12 md:py-20">

        {/* Hero */}
        <section className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-primary">
              Guia de utilização
            </span>

            <h1 className="mt-6 max-w-2xl text-4xl font-bold tracking-tight md:text-5xl animate-fade-up">
              Percebe melhor a realidade do arrendamento em Portugal.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground md:text-lg animate-fade-up [animation-delay:200ms]">
              Define o teu perfil, explora os indicadores habitacionais e
              compara municípios. Tudo começa com alguns passos simples.
            </p>

            <Link
              href="/mapa"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-background transition-all hover:opacity-90 animate-fade-up [animation-delay:400ms]"
            >
              Começar exploração
            </Link>
          </div>

          {/* Resumo do percurso */}
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-5 md:p-8">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />

            <div className="relative">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">
                  O teu percurso
                </span>

                <span className="text-xs text-muted-foreground">
                  4 etapas
                </span>
              </div>

              <div className="mt-7 space-y-6">
                {steps.map((step) => (
                  <div key={step.number} className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-sm font-bold text-primary">
                      {step.number}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="font-semibold">
                        {step.title}
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Etapas */}
        <section className="mt-24">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Passo a passo
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              Como funciona a análise?
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              A plataforma parte de um perfil de agregado familiar e permite
              explorar a relação entre rendimento, habitação e território.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {steps.map((step) => (
              <div
                key={step.number}
                className="group rounded-2xl border border-border bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50"
              >
                <span className="text-4xl font-bold text-primary/40">
                  {step.number}
                </span>

                <h3 className="mt-5 text-xl font-semibold">
                  {step.title}
                </h3>

                <p className="mt-3 leading-7 text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Taxa de esforço */}
        <section className="mt-24">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                Indicador principal
              </span>

              <h2 className="mt-3 text-3xl font-bold tracking-tight">
                O que é a taxa de esforço?
              </h2>

              <p className="mt-5 leading-7 text-muted-foreground">
                É a percentagem do rendimento líquido mensal do agregado
                que seria utilizada para pagar a renda considerada na análise.
              </p>

              <p className="mt-4 leading-7 text-muted-foreground">
                Quanto maior for esta percentagem, maior será o peso da renda
                no orçamento mensal do agregado.
              </p>
            </div>

            <Card className="p-6 md:p-8">
              <p className="text-sm font-medium text-muted-foreground">
                Fórmula de cálculo
              </p>

              <div className="mt-5 rounded-xl border border-border bg-background p-5 text-center">
                <p className="text-lg font-bold text-primary md:text-xl">
                  (Renda mensal ÷ Rendimento líquido mensal) × 100
                </p>
              </div>

              <div className="mt-7 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">
                    Exemplo de renda
                  </p>
                  <p className="mt-1 text-2xl font-bold">600 €</p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">
                    Exemplo de rendimento
                  </p>
                  <p className="mt-1 text-2xl font-bold">1.500 €</p>
                </div>
              </div>

              <div className="mt-6 border-t border-border pt-5">
                <p className="text-xs text-muted-foreground">
                  Resultado do exemplo
                </p>

                <p className="mt-1 text-4xl font-bold text-primary">
                  40%
                </p>

                <p className="mt-2 text-sm text-muted-foreground">
                  A renda representa 40% do rendimento líquido mensal.
                </p>
              </div>
            </Card>
          </div>
        </section>

        {/* Dados e interpretação */}
        <section className="mt-24 grid gap-6 md:grid-cols-2">
          <Card className="p-7">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Fontes e metodologia
            </span>

            <h2 className="mt-4 text-xl font-semibold">
              Conhece a origem dos indicadores
            </h2>

            <p className="mt-3 leading-7 text-muted-foreground">
              A interpretação dos resultados deve considerar a fonte,
              a data de referência, a unidade e a cobertura geográfica
              de cada indicador.
            </p>

            <Link
              href="/dados"
              className="mt-6 inline-flex text-sm font-semibold text-primary hover:opacity-80"
            >
              Consultar dados
            </Link>
          </Card>

          <Card className="p-7">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Nota importante
            </span>

            <h2 className="mt-4 text-xl font-semibold">
              Como interpretar os resultados
            </h2>

            <p className="mt-3 leading-7 text-muted-foreground">
              Os indicadores são instrumentos de análise e comparação.
              Não garantem a existência de imóveis disponíveis nem
              representam aconselhamento financeiro ou aprovação de crédito.
            </p>
          </Card>
        </section>

        {/* CTA final */}
        <section className="relative mt-24 overflow-hidden rounded-3xl border border-primary/20 bg-surface p-8 md:p-12">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Explora Portugal
            </span>

            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              Agora é a tua vez de explorar.
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              Consulta os municípios e descobre como os indicadores
              habitacionais variam ao longo do território português.
            </p>

            <Link
              href="/mapa"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-background transition-all hover:opacity-90"
            >
              Explorar mapa
            </Link>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
