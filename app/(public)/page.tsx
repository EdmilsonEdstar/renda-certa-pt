
"use client";

import Link from "next/link";
import AppShell from "@/components/layout/AppShell";
import Card from "@/components/ui/Card";
import { motion, useReducedMotion } from "framer-motion";
import {
  MapPinned,
  Database,
  SlidersHorizontal,
  ChartNoAxesCombined,
} from "lucide-react";

const features = [
  {
    title: "Mapa interativo",
    description:
      "Explora os municípios portugueses e consulta indicadores de acessibilidade ao arrendamento.",
    icon: MapPinned,
  },
  {
    title: "Dados fiáveis",
    description:
      "Consulta indicadores com fontes identificadas, datas de referência e metodologia transparente.",
    icon: Database,
  },
  {
    title: "Simulações",
    description:
      "Ajusta o rendimento do agregado e a tipologia para explorar diferentes cenários.",
    icon: SlidersHorizontal,
  },
  {
    title: "Comparação nacional",
    description:
      "Compara municípios e identifica diferenças territoriais na acessibilidade à habitação.",
    icon: ChartNoAxesCombined,
  },
];

const indicators = [
  {
    value: "308",
    label: "Municípios",
  },
  {
    value: "2",
    label: "Regiões Autónomas",
  },
  {
    value: "Dados do INE",
    label: "Fontes oficiais e atualização periódica",
  },
];

export default function HomePage() {
  const reduceMotion = useReducedMotion();

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : 24,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.65,
        ease: "easeOut" as const,
      },
    },
  };

  const stagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.13,
      },
    },
  };

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

        {/* Camada escura */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#06111f]/95 via-[#06111f]/70 to-[#06111f]/20" />

        <div className="mx-auto grid min-h-[560px] max-w-[1440px] items-center px-6 py-20 md:grid-cols-2 md:px-12">
          <motion.div
            className="max-w-2xl"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              className="mb-5 text-sm font-semibold uppercase tracking-wider text-primary"
            >
              Habitação e acessibilidade em Portugal
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl"
            >
              Encontra o teu lugar em Portugal
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-lg text-base leading-relaxed text-white/80 md:text-lg"
            >
              Analisa a acessibilidade ao arrendamento em todos os municípios,
              com base no teu rendimento.
            </motion.p>

            {/* Botões */}
            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap gap-4"
            >
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
            </motion.div>
          </motion.div>
        </div>

        {/* Indicadores */}
        <div className="border-t border-white/20 bg-[#06111f]/80 backdrop-blur-sm">
          <motion.div
            className="mx-auto grid max-w-[1440px] gap-6 px-6 py-7 sm:grid-cols-3 md:px-12"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {indicators.map((item, index) => (
              <motion.div
                key={item.label}
                variants={fadeUp}
                className="transition-transform duration-300 hover:-translate-y-0.5"
              >
                <p
                  className={
                    index === 2
                      ? "font-semibold text-white"
                      : "text-3xl font-bold text-primary"
                  }
                >
                  {item.value}
                </p>

                <p className="text-sm text-white/70">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FUNCIONALIDADES */}
      <section className="bg-background px-6 py-20 md:px-12">
        <div className="mx-auto max-w-[1440px]">
          <motion.div
            className="mb-12 max-w-2xl"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl font-bold text-white md:text-4xl"
            >
              Tudo o que precisas para analisar o arrendamento
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-4 text-base leading-relaxed text-white/70"
            >
              Explora os dados, simula diferentes cenários e compara municípios
              para compreender melhor a acessibilidade à habitação em Portugal.
            </motion.p>
          </motion.div>

          {/* Cards de funcionalidades */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <Card
                  key={feature.title}
                  className="group rounded-2xl border-white/10 bg-surface p-6 transition-colors duration-300 hover:border-primary/50"
                >
                  {/* Ícone */}
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl border border-[#24D9E8]/20 bg-[#24D9E8]/10 transition-colors duration-300 group-hover:bg-[#24D9E8]/20">
                    <Icon
                      size={30}
                      strokeWidth={1.8}
                      className="text-primary transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>

                  {/* Título */}
                  <h3 className="text-lg font-semibold text-primary">
                    {feature.title}
                  </h3>

                  {/* Descrição */}
                  <p className="mt-3 text-sm leading-relaxed text-white/70">
                    {feature.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </AppShell>
  );
}
