
import Link from "next/link";
import AppShell from "@/components/layout/AppShell";

const features = [
  {
    icon: "◎",
    title: "Mapa interativo",
    description: "Portugal inteiro",
  },
  {
    icon: "◉",
    title: "Dados fiáveis",
    description: "Fontes oficiais",
  },
  {
    icon: "▥",
    title: "Simulações personalizadas",
    description: "Com base no teu rendimento",
  },
  {
    icon: "♡",
    title: "Comparação nacional",
    description: "Vê como se compara",
  },
];

export default function HomePage() {
  return (
    <AppShell>
      <section className="relative isolate left-1/2 -ml-[50vw] w-screen overflow-hidden">
        {/* Fotografia de Lisboa */}
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center"
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

            <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              Encontra o teu lugar em Portugal
            </h1>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-white/80 md:text-lg">
              Analisa a acessibilidade ao arrendamento em todos os municípios,
              com base no teu rendimento.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/mapa"
                className="rounded-lg bg-primary px-6 py-3 font-semibold text-background transition hover:brightness-110"
              >
                Explorar mapa →
              </Link>

              <Link
                href="/como-funciona"
                className="rounded-lg border border-white/60 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
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

      {/* Funcionalidades */}
      <section className="grid gap-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <div key={feature.title} className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-2xl text-primary">
              {feature.icon}
            </div>

            <div>
              <h2 className="text-sm font-semibold text-foreground">
                {feature.title}
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </section>
    </AppShell>
  );
}
