
"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPinned, Menu, X } from "lucide-react";

const navigation = [
  { label: "Início", href: "/" },
  { label: "Como funciona", href: "/como-funciona" },
  { label: "Dados", href: "/dados" },
  { label: "Sobre", href: "/sobre" },
  { label: "Contacto", href: "/contacto" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1A5268] bg-[#06111F]/95 backdrop-blur-md">
      <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">

        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3"
          aria-label="PT Rental Map - Página inicial"
          onClick={() => setMenuOpen(false)}
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

        {/* Navegação desktop */}
        <nav
          aria-label="Navegação principal"
          className="hidden items-center gap-6 md:flex"
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

        {/* Botão desktop */}
        <Link
          href="/mapa"
          className="hidden rounded-lg bg-[#24D9E8] px-5 py-2.5 text-sm font-semibold text-[#06111F] transition-colors hover:bg-[#18BDCC] md:inline-flex"
        >
          Começar
        </Link>

        {/* Botão do menu mobile */}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#1A5268] text-[#24D9E8] transition-colors hover:bg-[#123449] md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Navegação mobile"
          className="border-t border-[#1A5268] bg-[#0B1D30] px-4 py-4 md:hidden"
        >
          <div className="flex flex-col gap-4">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-[#9BB2C5] transition-colors hover:text-[#24D9E8]"
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/mapa"
              onClick={() => setMenuOpen(false)}
              className="mt-2 rounded-lg bg-[#24D9E8] px-5 py-3 text-center text-sm font-semibold text-[#06111F] transition-colors hover:bg-[#18BDCC]"
            >
              Começar
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
