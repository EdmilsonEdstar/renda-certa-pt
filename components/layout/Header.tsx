"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
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
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

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
          {navigation.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative py-2 text-sm font-medium transition-colors duration-200 ${
                  active
                    ? "text-[#24D9E8]"
                    : "text-[#9BB2C5] hover:text-[#24D9E8]"
                }`}
              >
                {item.label}

                {active && (
                  <motion.span
                    layoutId="header-active-indicator"
                    className="absolute -bottom-0.5 left-0 h-0.5 w-full rounded-full bg-[#24D9E8]"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Botão desktop */}
        <Link
          href="/mapa"
          aria-current={pathname.startsWith("/mapa") ? "page" : undefined}
          className={`hidden rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-200 md:inline-flex ${
            pathname.startsWith("/mapa")
              ? "bg-[#18BDCC] text-[#06111F] ring-2 ring-[#24D9E8]/40"
              : "bg-[#24D9E8] text-[#06111F] hover:bg-[#18BDCC]"
          }`}
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
          <div className="flex flex-col gap-2">
            {navigation.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-lg border px-3 py-3 text-sm font-medium transition-colors duration-200 ${
                    active
                      ? "border-[#24D9E8]/40 bg-[#24D9E8]/10 text-[#24D9E8]"
                      : "border-transparent text-[#9BB2C5] hover:bg-[#123449] hover:text-[#24D9E8]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <Link
              href="/mapa"
              onClick={() => setMenuOpen(false)}
              aria-current={pathname.startsWith("/mapa") ? "page" : undefined}
              className={`mt-2 rounded-lg px-5 py-3 text-center text-sm font-semibold transition-colors ${
                pathname.startsWith("/mapa")
                  ? "bg-[#18BDCC] text-[#06111F] ring-2 ring-[#24D9E8]/40"
                  : "bg-[#24D9E8] text-[#06111F] hover:bg-[#18BDCC]"
              }`}
            >
              Começar
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}