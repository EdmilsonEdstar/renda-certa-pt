
"use client";

import { useState } from "react";
import AppShell from "@/components/layout/AppShell";
import PortugalMapLoader from "@/components/map/PortugalMapLoader";
import type { MunicipalityProperties } from "@/components/map/PortugalMap";

import {
  Search,
  Map as MapIcon,
  Satellite,
  SlidersHorizontal,
  RotateCcw,
  X,
  MapPin,
  Ruler,
  Building2,
} from "lucide-react";

import {
  calculateEffortRate,
  classifyEffort,
  calculateRemainingAfterRent,
} from "@/lib/calculations/effort";

import type { EffortStatus } from "@/lib/calculations/effort";

function formatCurrency(value: number | null): string {
  if (value === null || !Number.isFinite(value)) {
    return "—";
  }

  return new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 2,
  }).format(value);
}

type StatusInfo = {
  label: string;
  description: string;
  color: string;
  background: string;
  border: string;
};

const STATUS_INFO: Record<EffortStatus, StatusInfo> = {
  good: {
    label: "Boa acessibilidade",
    description: "A renda representa até 25% do rendimento.",
    color: "text-[#48DC98]",
    background: "bg-[#48DC98]/10",
    border: "border-[#48DC98]/30",
  },
  moderate: {
    label: "Acessibilidade moderada",
    description:
      "A renda representa mais de 25% e até 35% do rendimento.",
    color: "text-[#FFCD4B]",
    background: "bg-[#FFCD4B]/10",
    border: "border-[#FFCD4B]/30",
  },
  low: {
    label: "Baixa acessibilidade",
    description: "A renda representa mais de 35% do rendimento.",
    color: "text-[#FF6970]",
    background: "bg-[#FF6970]/10",
    border: "border-[#FF6970]/30",
  },
  missing: {
    label: "Sem dados",
    description:
      "Introduz uma renda válida e um rendimento positivo.",
    color: "text-[#9BB2C5]",
    background: "bg-[#9BB2C5]/10",
    border: "border-[#9BB2C5]/30",
  },
};

export default function MapaPage() {
  const [household, setHousehold] = useState("3");
  const [income, setIncome] = useState(1800);
  const [typology, setTypology] = useState("T2");
  const [effort, setEffort] = useState(35);
  const [mapMode, setMapMode] = useState("map");
  const [search, setSearch] = useState("");
  const [applied, setApplied] = useState(false);

  const [selectedMunicipality, setSelectedMunicipality] =
    useState<MunicipalityProperties | null>(null);

  const [monthlyRent, setMonthlyRent] = useState("");

  const rentValue =
    monthlyRent.trim() === "" ? null : Number(monthlyRent);

  const effortRate = calculateEffortRate(rentValue, income);

  const remainingAfterRent = calculateRemainingAfterRent(
    rentValue,
    income
  );

  // Tipagem explícita para garantir uma chave válida em STATUS_INFO.
  const effortStatus: EffortStatus = classifyEffort(effortRate);

  const statusInfo = STATUS_INFO[effortStatus];

  function handleMunicipalitySelect(
    municipality: MunicipalityProperties
  ) {
    setSelectedMunicipality(municipality);
    setMonthlyRent("");
  }

  function closeMunicipalityPanel() {
    setSelectedMunicipality(null);
    setMonthlyRent("");
  }

  function clearFilters() {
    setHousehold("3");
    setIncome(1800);
    setTypology("T2");
    setEffort(35);
    setSearch("");
    setApplied(false);
    setSelectedMunicipality(null);
    setMonthlyRent("");
  }

  return (
    <AppShell>
      <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-[#06111F] text-[#E8F3FA]">
        <div className="grid min-h-[calc(100dvh-76px)] grid-cols-1 lg:grid-cols-[320px_minmax(0,1fr)]">

          {/* PAINEL LATERAL */}

          <aside className="relative z-10 border-b border-[#1A5268] bg-[#071725] p-3 lg:min-h-[calc(100dvh-76px)] lg:border-b-0 lg:border-r">

            <div className="mb-4 px-1">
              <h2 className="text-base font-bold tracking-tight text-[#E8F3FA]">
                Define o teu perfil
              </h2>

              <p className="mt-1 text-xs leading-relaxed text-[#9BB2C5]">
                Preenche os teus dados para explorar a acessibilidade habitacional nos municípios portugueses.
              </p>
            </div>

            {/* AGREGADO FAMILIAR */}

            <section className="rounded-xl border border-[#1A5268] bg-[#0B1D30] p-3">
              <h2 className="mb-3 text-xs font-semibold">
                Tamanho do agregado familiar
              </h2>

              <div className="grid grid-cols-4 gap-2">
                {["1", "2", "3", "4+"].map((value) => (
                  <button
                    key={value}
                    onClick={() => setHousehold(value)}
                    className={`flex flex-col items-center gap-2 rounded-lg border px-1 py-3 transition ${
                      household === value
                        ? "border-[#24D9E8] bg-[#24D9E8]/15 text-[#24D9E8]"
                        : "border-[#1A5268] bg-[#10283D] text-[#9BB2C5] hover:border-[#24D9E8]/50"
                    }`}
                  >
                    <svg
                      viewBox="0 0 48 40"
                      className="h-8 w-10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {value === "1" && (
                        <>
                          <circle cx="24" cy="9" r="6" />
                          <path d="M12 36v-5a12 12 0 0 1 24 0v5" />
                        </>
                      )}

                      {value === "2" && (
                        <>
                          <circle cx="16" cy="10" r="5" />
                          <circle cx="33" cy="10" r="5" />
                          <path d="M5 36v-5a11 11 0 0 1 22 0v5" />
                          <path d="M25 26a10 10 0 0 1 18 5v5" />
                        </>
                      )}

                      {value === "3" && (
                        <>
                          <circle cx="24" cy="8" r="5" />
                          <circle cx="10" cy="15" r="4" />
                          <circle cx="38" cy="15" r="4" />
                          <path d="M13 36v-5a11 11 0 0 1 22 0v5" />
                          <path d="M1 36v-4a9 9 0 0 1 8-9" />
                          <path d="M47 36v-4a9 9 0 0 0-8-9" />
                        </>
                      )}

                      {value === "4+" && (
                        <>
                          <circle cx="16" cy="9" r="5" />
                          <circle cx="32" cy="9" r="5" />
                          <circle cx="7" cy="19" r="3.5" />
                          <circle cx="41" cy="19" r="3.5" />
                          <path d="M5 36v-5a11 11 0 0 1 22 0v5" />
                          <path d="M21 36v-5a11 11 0 0 1 22 0v5" />
                        </>
                      )}
                    </svg>

                    <span className="text-xs font-semibold">
                      {value}
                    </span>
                  </button>
                ))}
              </div>
            </section>

            {/* RENDIMENTO */}

            <section className="mt-3 rounded-xl border border-[#1A5268] bg-[#0B1D30] p-3">
              <label htmlFor="income" className="text-xs font-semibold">
                Rendimento líquido mensal
              </label>

              <div className="mt-2 flex items-center gap-2 border-b border-[#1A5268] pb-2">
                <span className="text-lg font-semibold text-[#24D9E8]">
                  €
                </span>

                <input
                  id="income"
                  type="number"
                  min="0"
                  max="5000"
                  step="0.01"
                  value={income}
                  onChange={(event) =>
                    setIncome(Math.max(0, Number(event.target.value)))
                  }
                  className="w-full bg-transparent text-lg font-semibold outline-none"
                />
              </div>

              <input
                type="range"
                min="500"
                max="5000"
                step="50"
                value={Math.min(5000, Math.max(500, income))}
                onChange={(event) =>
                  setIncome(Number(event.target.value))
                }
                className="mt-4 w-full accent-[#24D9E8]"
              />

              <div className="flex justify-between text-[10px] text-[#9BB2C5]">
                <span>€500</span>
                <span>€5.000</span>
              </div>
            </section>

            {/* TIPOLOGIA */}

            <section className="mt-3 rounded-xl border border-[#1A5268] bg-[#0B1D30] p-3">
              <h2 className="mb-3 text-xs font-semibold">
                Tipologia de habitação
              </h2>

              <div className="grid grid-cols-4 gap-1.5">
                {["Estúdio", "T1", "T2", "T3+"].map((value) => (
                  <button
                    key={value}
                    onClick={() => setTypology(value)}
                    className={`rounded-lg border px-1 py-2 text-xs transition ${
                      typology === value
                        ? "border-[#24D9E8] bg-[#24D9E8]/20 font-bold text-[#24D9E8]"
                        : "border-[#1A5268] bg-[#10283D] text-[#9BB2C5] hover:border-[#24D9E8]/50"
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </section>

            {/* FILTROS ADICIONAIS */}

            <section className="mt-3 rounded-xl border border-[#1A5268] bg-[#0B1D30] p-3">
              <div className="mb-3 flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-[#24D9E8]" />

                <h2 className="text-xs font-semibold">
                  Filtros adicionais
                </h2>
              </div>

              <label htmlFor="effort" className="text-xs text-[#9BB2C5]">
                Taxa de esforço máxima (%)
              </label>

              <input
                id="effort"
                type="range"
                min="10"
                max="50"
                step="5"
                value={effort}
                onChange={(event) =>
                  setEffort(Number(event.target.value))
                }
                className="mt-3 w-full accent-[#24D9E8]"
              />

              <div className="flex justify-between text-[10px] text-[#9BB2C5]">
                <span>10%</span>
                <span>20%</span>
                <span>35%</span>
                <span>50%</span>
              </div>

              <p className="mt-3 text-right text-xs font-semibold text-[#24D9E8]">
                Máximo: {effort}%
              </p>
            </section>

            {/* AÇÕES */}

            <div className="mt-3 grid grid-cols-[1fr_auto] gap-2">
              <button
                onClick={() => setApplied(true)}
                className="rounded-lg bg-[#24D9E8] px-3 py-3 text-xs font-bold text-[#06111F] transition hover:bg-[#65EAF2]"
              >
                Aplicar filtros
              </button>

              <button
                onClick={clearFilters}
                className="flex items-center gap-1 rounded-lg border border-[#1A5268] px-3 py-3 text-xs text-[#9BB2C5] transition hover:border-[#24D9E8] hover:text-[#24D9E8]"
              >
                <RotateCcw className="h-3 w-3" />
                Limpar
              </button>
            </div>

            {applied && (
              <p className="mt-2 text-center text-[11px] text-[#48DC98]">
                Perfil aplicado. O rendimento definido será utilizado nos cálculos.
              </p>
            )}

          </aside>

          {/* ÁREA DO MAPA */}

          <main className="relative h-[65svh] min-h-[440px] bg-[#06111F] sm:h-[70svh] lg:h-[calc(100dvh-76px)] lg:min-h-[600px]">

            {/* BARRA SUPERIOR */}

            <div className="absolute left-2 right-2 top-2 z-[500] flex flex-wrap items-center justify-between gap-2 sm:left-3 sm:right-3 sm:top-3">
              <div className="flex overflow-hidden rounded-lg border border-[#1A5268] bg-[#0B1D30]/95 shadow-lg backdrop-blur">
                <button
                  onClick={() => setMapMode("map")}
                  className={`flex items-center gap-2 px-4 py-2 text-xs ${
                    mapMode === "map"
                      ? "bg-[#24D9E8]/15 text-[#24D9E8]"
                      : "text-[#9BB2C5]"
                  }`}
                >
                  <MapIcon className="h-4 w-4" />
                  Mapa
                </button>

                <button
                  onClick={() => setMapMode("satellite")}
                  className={`flex items-center gap-2 border-l border-[#1A5268] px-4 py-2 text-xs ${
                    mapMode === "satellite"
                      ? "bg-[#24D9E8]/15 text-[#24D9E8]"
                      : "text-[#9BB2C5]"
                  }`}
                >
                  <Satellite className="h-4 w-4" />
                  Satélite
                </button>
              </div>

              <div className="relative w-full min-w-0 sm:w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9BB2C5]" />

                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Pesquisar município..."
                  className="w-full rounded-lg border border-[#1A5268] bg-[#0B1D30]/95 py-2 pl-9 pr-3 text-xs text-white outline-none backdrop-blur placeholder:text-[#9BB2C5] focus:border-[#24D9E8]"
                />
              </div>
            </div>

            {/* MAPA */}

            <div className="absolute inset-0">
              <PortugalMapLoader
                onMunicipalitySelect={handleMunicipalitySelect}
              />
            </div>

            {/* LEGENDA */}

            <div className="absolute right-3 top-16 z-[500] w-52 rounded-xl border border-[#1A5268] bg-[#0B1D30]/95 p-3 shadow-xl backdrop-blur">
              <h2 className="mb-3 text-xs font-semibold">
                Estado de Acessibilidade
              </h2>

              <div className="space-y-2 text-[11px] text-[#D6E5EF]">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#48DC98]" />
                  Boa acessibilidade
                </div>

                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FFCD4B]" />
                  Acessibilidade moderada
                </div>

                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FF6970]" />
                  Baixa acessibilidade
                </div>

                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#D6E5EF]" />
                  Sem dados
                </div>
              </div>
            </div>

            {/* PAINEL DO MUNICÍPIO SELECIONADO */}

            {selectedMunicipality && (
              <div className="absolute bottom-16 left-3 right-3 z-[600] max-h-[65%] overflow-y-auto rounded-xl border border-[#1A5268] bg-[#0B1D30]/95 p-4 shadow-2xl backdrop-blur sm:bottom-16 sm:left-auto sm:right-4 sm:w-96">

                <div className="mb-4 flex items-start justify-between gap-3">
                  <div>
                    <div className="mb-2 flex items-center gap-2 text-[#24D9E8]">
                      <MapPin className="h-4 w-4" />

                      <span className="text-[10px] font-semibold uppercase tracking-wider">
                        Município selecionado
                      </span>
                    </div>

                    <h2 className="text-lg font-bold text-[#E8F3FA]">
                      {selectedMunicipality.nome}
                    </h2>

                    <p className="mt-1 text-xs text-[#9BB2C5]">
                      {selectedMunicipality.distrito_ilha}
                    </p>
                  </div>

                  <button
                    onClick={closeMunicipalityPanel}
                    aria-label="Fechar informação do município"
                    className="rounded-lg p-2 text-[#9BB2C5] transition hover:bg-[#10283D] hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* INFORMAÇÃO GEOGRÁFICA */}

                <div className="space-y-3">
                  <div className="rounded-lg border border-[#1A5268] bg-[#10283D] p-3">
                    <div className="mb-1 flex items-center gap-2 text-[#9BB2C5]">
                      <MapPin className="h-3.5 w-3.5" />

                      <span className="text-[10px]">
                        Código do município
                      </span>
                    </div>

                    <p className="text-sm font-semibold">
                      {selectedMunicipality.codigo}
                    </p>
                  </div>

                  <div className="rounded-lg border border-[#1A5268] bg-[#10283D] p-3">
                    <div className="mb-1 flex items-center gap-2 text-[#9BB2C5]">
                      <Building2 className="h-3.5 w-3.5" />

                      <span className="text-[10px]">
                        Região NUTS III
                      </span>
                    </div>

                    <p className="text-sm font-semibold">
                      {selectedMunicipality.nuts3 || "Não disponível"}
                    </p>
                  </div>

                  <div className="rounded-lg border border-[#1A5268] bg-[#10283D] p-3">
                    <div className="mb-1 flex items-center gap-2 text-[#9BB2C5]">
                      <Ruler className="h-3.5 w-3.5" />

                      <span className="text-[10px]">
                        Área do município
                      </span>
                    </div>

                    <p className="text-sm font-semibold">
                      {Number(selectedMunicipality.area_ha).toLocaleString(
                        "pt-PT",
                        { maximumFractionDigits: 2 }
                      )}{" "}
                      ha
                    </p>
                  </div>
                </div>

                {/* CALCULADORA DE ACESSIBILIDADE */}

                <div className="mt-4 border-t border-[#1A5268] pt-4">
                  <h3 className="text-sm font-bold text-[#E8F3FA]">
                    Análise de acessibilidade
                  </h3>

                  <p className="mt-1 text-[11px] leading-relaxed text-[#9BB2C5]">
                    Introduz uma renda mensal para calcular o seu peso no rendimento do agregado familiar.
                  </p>

                  <div className="mt-4">
                    <label
                      htmlFor="monthly-rent"
                      className="text-xs font-semibold"
                    >
                      Renda mensal considerada
                    </label>

                    <div className="mt-2 flex items-center gap-2 rounded-lg border border-[#1A5268] bg-[#10283D] px-3 py-3 focus-within:border-[#24D9E8]">
                      <span className="font-semibold text-[#24D9E8]">
                        €
                      </span>

                      <input
                        id="monthly-rent"
                        type="number"
                        min="0"
                        step="0.01"
                        value={monthlyRent}
                        onChange={(event) =>
                          setMonthlyRent(event.target.value)
                        }
                        placeholder="Ex.: 650"
                        className="w-full bg-transparent text-sm font-semibold text-white outline-none placeholder:text-[#71899C]"
                      />
                    </div>

                    <p className="mt-2 text-[10px] text-[#9BB2C5]">
                      Valor de simulação introduzido por ti. Não corresponde a uma renda estatística deste município.
                    </p>
                  </div>

                  {/* RESULTADOS */}

                  <div className="mt-4 rounded-xl border border-[#1A5268] bg-[#10283D] p-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs text-[#9BB2C5]">
                        Taxa de esforço
                      </span>

                      <span
                        className={`text-xl font-bold tabular-nums ${statusInfo.color}`}
                      >
                        {effortRate === null
                          ? "—"
                          : `${effortRate.toLocaleString("pt-PT", {
                              maximumFractionDigits: 1,
                            })}%`}
                      </span>
                    </div>

                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#06111F]">
                      <div
                        className={`h-full rounded-full transition-all ${
                          effortStatus === "good"
                            ? "bg-[#48DC98]"
                            : effortStatus === "moderate"
                              ? "bg-[#FFCD4B]"
                              : effortStatus === "low"
                                ? "bg-[#FF6970]"
                                : "bg-[#71899C]"
                        }`}
                        style={{
                          width: `${Math.min(effortRate ?? 0, 100)}%`,
                        }}
                      />
                    </div>

                    <div
                      className={`mt-3 rounded-lg border p-3 ${statusInfo.background} ${statusInfo.border}`}
                    >
                      <p className={`text-xs font-bold ${statusInfo.color}`}>
                        {statusInfo.label}
                      </p>

                      <p className="mt-1 text-[10px] leading-relaxed text-[#9BB2C5]">
                        {statusInfo.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 rounded-xl border border-[#1A5268] bg-[#10283D] p-3">
                    <p className="text-[10px] text-[#9BB2C5]">
                      Rendimento líquido mensal
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      {formatCurrency(income)}
                    </p>

                    <div className="mt-3 border-t border-[#1A5268] pt-3">
                      <p className="text-[10px] text-[#9BB2C5]">
                        Saldo após pagamento da renda
                      </p>

                      <p className="mt-1 text-lg font-bold text-[#24D9E8]">
                        {formatCurrency(remainingAfterRent)}
                      </p>

                      <p className="mt-1 text-[10px] leading-relaxed text-[#9BB2C5]">
                        Não representa poupança. Ainda é necessário considerar as restantes despesas mensais.
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 rounded-lg border border-dashed border-[#1A5268] p-3">
                    <p className="text-[10px] leading-relaxed text-[#9BB2C5]">
                      A classificação utiliza limites de referência configurados para este protótipo: boa até 25%, moderada acima de 25% até 35% e baixa acima de 35%. Estes limites são critérios de exploração, não regras legais ou universais.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* INFORMAÇÃO DO PERFIL */}

            <div className="absolute bottom-4 left-4 z-[500] rounded-lg border border-[#1A5268] bg-[#0B1D30]/95 px-3 py-2 text-[10px] text-[#9BB2C5] shadow-lg backdrop-blur">
              Perfil: {household} pessoas · {formatCurrency(income)} · {typology}
            </div>

          </main>
        </div>
      </div>
    </AppShell>
  );
}
