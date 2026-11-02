
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#06111f]">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-6 py-12 md:grid-cols-3 md:px-12">

        {/* Identidade do projeto */}
        <div>
          <h2 className="text-lg font-bold text-white">
            PT <span className="text-primary">Rental Map</span>
          </h2>

          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/60">
            Uma plataforma de análise da acessibilidade ao arrendamento
            em Portugal, através de indicadores territoriais e simulações.
          </p>
        </div>

        {/* Navegação */}
        <div>
          <h3 className="mb-4 text-sm font-semibold text-white">
            Navegação
          </h3>

          <nav className="flex flex-col gap-3 text-sm text-white/60">
            <Link href="/" className="transition hover:text-primary">
              Início
            </Link>

            <Link href="/mapa" className="transition hover:text-primary">
              Mapa
            </Link>

            <Link href="/como-funciona" className="transition hover:text-primary">
              Como funciona
            </Link>

            <Link href="/dados" className="transition hover:text-primary">
              Dados
            </Link>
          </nav>
        </div>

        {/* Transparência */}
        <div>
          <h3 className="mb-4 text-sm font-semibold text-white">
            Transparência
          </h3>

          <p className="text-sm leading-relaxed text-white/60">
            Consulta as fontes, datas de referência e metodologia
            utilizadas nos indicadores apresentados.
          </p>

          <Link
            href="/dados"
            className="mt-3 inline-block text-sm font-medium text-primary transition hover:text-white"
          >
            Consultar dados →
          </Link>
        </div>
      </div>

      {/* Assinatura e direitos */}
      <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 px-6 py-5 text-center sm:flex-row">

        <p className="text-xs text-white/40">
          © 2026 PT Rental Map. Todos os direitos reservados.
        </p>

        <p className="text-sm text-white/60">
          Desenvolvido por{" "}
          <a
            href="https://edmilsonportfolio.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-primary transition hover:text-white"
          >
            Edmilson António ↗
          </a>
        </p>

      </div>
    </footer>
  );
}
