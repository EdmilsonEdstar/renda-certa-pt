
import Link from "next/link";
import { MapPinned } from "lucide-react";

const navigation = [
  { label: "Início", href: "/" },
  { label: "Como funciona", href: "/como-funciona" },
  { label: "Dados", href: "/dados" },
  { label: "Sobre", href: "/sobre" },
  { label: "Contacto", href: "/contacto" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1A5268] bg-[#06111F]/95 backdrop-blur-md">
      <div className="mx-auto flex min-h-20 max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-3">

        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3"
          aria-label="PT Rental Map - Página inicial"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#1A5268] bg-[#123449]">
            <MapPinned
              size={25}
              strokeWidth={1.8}
              className="text-[#24D9E8]"
            />
          </div>

          <span className="text-lg font-bold tracking-tight text-[#E8F3FA]">
            PT Rental <span className="text-[#24D9E8]">Map</span>
          </span>
        </Link>

        {/* Navegação */}
        <nav
          aria-label="Navegação principal"
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[#9BB2C5] transition-colors hover:text-[#24D9E8]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Botão principal */}
        <Link
          href="/mapa"
          className="rounded-lg bg-[#24D9E8] px-5 py-2.5 text-sm font-semibold text-[#06111F] transition-colors hover:bg-[#18BDCC]"
        >
          Começar
        </Link>

      </div>
    </header>
  );
}
