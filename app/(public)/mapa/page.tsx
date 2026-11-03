

"use client";



import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";



import AppShell from "@/components/layout/AppShell";
import Toast from "@/components/ui/Toast";

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



// --------------------------------------------------

// TIPOS DOS DADOS DO INE

// --------------------------------------------------



type AnnualRentData = {

  rentMedianPerM2: number | null;

  newContracts: number | null;

  status: "official" | "missing" | string;

};



type MunicipalRentRecord = {

  code: string;

  ineCode: string;

  name: string;

  annual: Record<string, AnnualRentData>;

};



type MunicipalRentDataset = {

  metadata: {

    title: string;

    source: string;

    rentIndicatorId: string;

    contractsIndicatorId: string;

    unit: string;

    periodicity: string;

    geography: string;

    referenceYears: number[];

    sourceLastUpdated: string;

    rentSourceUrl: string;

    coverageByYear?: Record<

      string,

      {

        availableMunicipalities: number;

        missingMunicipalities: number;

      }

    >;

  };

  municipalities: MunicipalRentRecord[];

};



type StatusInfo = {

  label: string;

  description: string;

  color: string;

  background: string;

  border: string;

};



// --------------------------------------------------

// CLASSIFICAÇÃO DA ACESSIBILIDADE

// --------------------------------------------------



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

      "Não existem dados suficientes para calcular a acessibilidade.",

    color: "text-[#9BB2C5]",

    background: "bg-[#9BB2C5]/10",

    border: "border-[#9BB2C5]/30",

  },

};



// --------------------------------------------------

// FUNÇÕES AUXILIARES

// --------------------------------------------------



function formatCurrency(value: number | null): string {

  if (value === null || !Number.isFinite(value)) {

    return "—";

  }



  return new Intl.NumberFormat("pt-PT", {

    style: "currency",

    currency: "EUR",

    minimumFractionDigits: 2,

    maximumFractionDigits: 2,

  }).format(value);

}



function formatNumber(value: number | null): string {

  if (value === null || !Number.isFinite(value)) {

    return "—";

  }



  return new Intl.NumberFormat("pt-PT", {

    minimumFractionDigits: 2,

    maximumFractionDigits: 2,

  }).format(value);

}



function formatDate(value: string): string {

  if (!value) return "Não indicada";



  const parts = value.split("-");



  if (parts.length !== 3) return value;



  return `${parts[2]}/${parts[1]}/${parts[0]}`;

}



// --------------------------------------------------

// PÁGINA DO MAPA

// --------------------------------------------------



export default function MapaPage() {

  // Perfil: começa sem valores predefinidos.

  const [household, setHousehold] = useState<string | null>(null);

  const [income, setIncome] = useState("");

  const [typology, setTypology] = useState<string | null>(null);

  const [dwellingArea, setDwellingArea] = useState("");



  // Filtros

  const [effort, setEffort] = useState(35);

  const [mapMode, setMapMode] = useState("map");

  const [search, setSearch] = useState("");

  const [applied, setApplied] = useState(false);

  const [showProfileSuccess, setShowProfileSuccess] = useState(false);
  const closeProfileSuccess = useCallback(() => setShowProfileSuccess(false), []);



  // Município selecionado

  const [selectedMunicipality, setSelectedMunicipality] =

    useState<MunicipalityProperties | null>(null);



  // Dados do INE

  const [rentDataset, setRentDataset] =

    useState<MunicipalRentDataset | null>(null);



  const [rentDataLoading, setRentDataLoading] = useState(true);

  const [rentDataError, setRentDataError] = useState(false);





  // --------------------------------------------------

  // VALIDAR PERFIL

  // --------------------------------------------------



  const incomeValue =

    income.trim() === "" ? null : Number(income);



  const areaValue =

    dwellingArea.trim() === "" ? null : Number(dwellingArea);



  const validIncome =

    incomeValue !== null &&

    Number.isFinite(incomeValue) &&

    incomeValue > 0;



  const validArea =

    areaValue !== null &&

    Number.isFinite(areaValue) &&

    areaValue > 0;



  const profileComplete =

    household !== null &&

    typology !== null &&

    validIncome &&

    validArea;



  // --------------------------------------------------

  // CARREGAR DADOS DO INE

  // --------------------------------------------------



  useEffect(() => {

    let active = true;



    async function loadRentData() {

      try {

        const response = await fetch(

          "/data/rendas-municipais.json",

          { cache: "no-store" }

        );



        if (!response.ok) {

          throw new Error(

            "Não foi possível carregar os dados do INE."

          );

        }



        const data =

          (await response.json()) as MunicipalRentDataset;



        if (

          !data.metadata ||

          !Array.isArray(data.metadata.referenceYears) ||

          !Array.isArray(data.municipalities)

        ) {

          throw new Error("Estrutura dos dados inválida.");

        }



        if (active) {

          setRentDataset(data);

          setRentDataError(false);

        }

      } catch (error) {

        console.error(

          "Erro ao carregar rendas municipais:",

          error

        );



        if (active) {

          setRentDataError(true);

        }

      } finally {

        if (active) {

          setRentDataLoading(false);

        }

      }

    }



    loadRentData();



    return () => {

      active = false;

    };

  }, []);



  // --------------------------------------------------

  // IDENTIFICAR DADOS DO MUNICÍPIO

  // --------------------------------------------------



  const referenceYears =

    rentDataset?.metadata.referenceYears ?? [];



  const referenceYear =

    referenceYears.length > 0

      ? Math.max(...referenceYears)

      : null;



  const municipalRentRecord =

    selectedMunicipality && rentDataset

      ? rentDataset.municipalities.find(

          (item) =>

            String(item.code).padStart(4, "0") ===

            String(selectedMunicipality.codigo).padStart(4, "0")

        )

      : undefined;



  const annualRent =

    referenceYear !== null

      ? municipalRentRecord?.annual[String(referenceYear)]

      : undefined;



  const rentMedianPerM2 =

    typeof annualRent?.rentMedianPerM2 === "number" &&

    annualRent.rentMedianPerM2 >= 0

      ? annualRent.rentMedianPerM2

      : null;



  const availableContracts =

    annualRent?.newContracts ?? null;



  // --------------------------------------------------

  // CALCULAR RENDA E TAXA DE ESFORÇO

  // --------------------------------------------------



  const estimatedMonthlyRent =

    rentMedianPerM2 !== null && validArea

      ? rentMedianPerM2 * areaValue!

      : null;



  const effortRate = applied

    ? calculateEffortRate(estimatedMonthlyRent, incomeValue)

    : null;



  const remainingAfterRent = applied

    ? calculateRemainingAfterRent(

        estimatedMonthlyRent,

        incomeValue

      )

    : null;



  const effortStatus: EffortStatus =

    classifyEffort(effortRate);



  const statusInfo = STATUS_INFO[effortStatus];



  const coverage =

    referenceYear !== null

      ? rentDataset?.metadata.coverageByYear?.[

          String(referenceYear)

        ]

      : undefined;



  // --------------------------------------------------

  // ALTERAÇÕES AO PERFIL

  // --------------------------------------------------



  function updateHousehold(value: string) {
    setHousehold(value);
    setApplied(false);
    setShowProfileSuccess(false);
  }

  function updateIncome(value: string) {
    setIncome(value);
    setApplied(false);
    setShowProfileSuccess(false);
  }

  function updateTypology(value: string) {
    setTypology(value);
    setApplied(false);
    setShowProfileSuccess(false);
  }

  function updateDwellingArea(value: string) {
    setDwellingArea(value);
    setApplied(false);
    setShowProfileSuccess(false);
  }

  function applyProfile() {
    if (!profileComplete) return;

    setApplied(true);
    setShowProfileSuccess(true);
  }



  // --------------------------------------------------

  // SELEÇÃO DE MUNICÍPIO

  // --------------------------------------------------



  function handleMunicipalitySelect(

    municipality: MunicipalityProperties

  ) {

    setSelectedMunicipality(municipality);

  }



  function closeMunicipalityPanel() {

    setSelectedMunicipality(null);

  }



  // --------------------------------------------------

  // LIMPAR PERFIL

  // --------------------------------------------------



  function clearFilters() {
    setHousehold(null);
    setIncome("");
    setTypology(null);
    setDwellingArea("");
    setEffort(35);
    setSearch("");
    setApplied(false);
    setShowProfileSuccess(false);
    setSelectedMunicipality(null);
  }



  // --------------------------------------------------

  // INTERFACE

  // --------------------------------------------------



  return (

    <AppShell>

      <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-[#06111F] text-[#E8F3FA]">



        <div className="grid min-h-[calc(100dvh-76px)] grid-cols-1 lg:grid-cols-[320px_minmax(0,1fr)]">



          {/* PAINEL LATERAL */}



          <aside className="relative z-10 border-b border-[#1A5268] bg-[#071725] p-3 lg:min-h-[calc(100dvh-76px)] lg:border-b-0 lg:border-r">



            <div className="mb-4 px-1">

              <h2 className="text-base font-bold tracking-tight">

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

                    type="button"

                    aria-pressed={household === value}

                    onClick={() => updateHousehold(value)}

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



              {household === null && (

                <p className="mt-2 text-[10px] text-[#9BB2C5]">

                  Seleciona o número de pessoas do agregado.

                </p>

              )}

            </section>



            {/* RENDIMENTO */}



            <section className="mt-3 rounded-xl border border-[#1A5268] bg-[#0B1D30] p-3">

              <label

                htmlFor="income"

                className="text-xs font-semibold"

              >

                Rendimento líquido mensal do agregado

              </label>



              <div className="mt-2 flex items-center gap-2 border-b border-[#1A5268] pb-2">

                <span className="text-lg font-semibold text-[#24D9E8]">

                  €

                </span>



                <input

                  id="income"

                  type="number"

                  min="0.01"

                  step="0.01"

                  value={income}

                  onChange={(event) =>

                    updateIncome(event.target.value)

                  }

                  placeholder="Ex.: 1800"

                  className="w-full bg-transparent text-lg font-semibold outline-none placeholder:text-[#71899C]"

                />

              </div>



              {validIncome && incomeValue !== null && incomeValue <= 5000 && (

                <input

                  type="range"

                  min="0"

                  max="5000"

                  step="50"

                  value={incomeValue}

                  onChange={(event) =>

                    updateIncome(event.target.value)

                  }

                  className="mt-4 w-full accent-[#24D9E8]"

                />

              )}



              <p className="mt-2 text-[10px] text-[#9BB2C5]">

                Indica o rendimento líquido mensal total de todas as pessoas do agregado.

              </p>

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

                    type="button"

                    aria-pressed={typology === value}

                    onClick={() => updateTypology(value)}

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



              {typology === null && (

                <p className="mt-2 text-[10px] text-[#9BB2C5]">

                  Seleciona a tipologia que procuras.

                </p>

              )}

            </section>



            {/* ÁREA DA HABITAÇÃO */}



            <section className="mt-3 rounded-xl border border-[#1A5268] bg-[#0B1D30] p-3">

              <label

                htmlFor="dwellingArea"

                className="text-xs font-semibold"

              >

                Área da habitação

              </label>



              <div className="mt-2 flex items-center gap-2 border-b border-[#1A5268] pb-2">

                <Ruler className="h-4 w-4 text-[#24D9E8]" />



                <input

                  id="dwellingArea"

                  type="number"

                  min="1"

                  step="1"

                  value={dwellingArea}

                  onChange={(event) =>

                    updateDwellingArea(event.target.value)

                  }

                  placeholder="Ex.: 80"

                  className="w-full bg-transparent text-lg font-semibold outline-none placeholder:text-[#71899C]"

                />



                <span className="text-sm text-[#9BB2C5]">

                  m²

                </span>

              </div>



              <p className="mt-2 text-[10px] leading-relaxed text-[#9BB2C5]">

                Indica a área aproximada da habitação. É utilizada para estimar a renda a partir do valor do INE por metro quadrado.

              </p>

            </section>



            {/* FILTROS ADICIONAIS */}



            <section className="mt-3 rounded-xl border border-[#1A5268] bg-[#0B1D30] p-3">

              <div className="mb-3 flex items-center gap-2">

                <SlidersHorizontal className="h-4 w-4 text-[#24D9E8]" />



                <h2 className="text-xs font-semibold">

                  Filtros adicionais

                </h2>

              </div>



              <label

                htmlFor="effort"

                className="text-xs text-[#9BB2C5]"

              >

                Taxa de esforço máxima (%)

              </label>



              <input

                id="effort"

                type="range"

                min="10"

                max="50"

                step="5"

                value={effort}

                onChange={(event) => {

                  setEffort(Number(event.target.value));

                  setApplied(false);

                }}

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



            {/* APLICAR PERFIL E LIMPAR */}



            <div className="mt-3 grid grid-cols-[1fr_auto] gap-2">

              <button

                type="button"

                onClick={applyProfile}

                disabled={!profileComplete}

                className="rounded-lg bg-[#24D9E8] px-3 py-3 text-xs font-bold text-[#06111F] transition hover:bg-[#65EAF2] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-[#24D9E8]"

              >

                Aplicar perfil

              </button>



              <button

                type="button"

                onClick={clearFilters}

                className="flex items-center gap-1 rounded-lg border border-[#1A5268] px-3 py-3 text-xs text-[#9BB2C5] transition hover:border-[#24D9E8] hover:text-[#24D9E8]"

              >

                <RotateCcw className="h-3 w-3" />

                Limpar

              </button>

            </div>



            {!profileComplete && (

              <p className="mt-2 text-center text-[10px] leading-relaxed text-[#9BB2C5]">

                Preenche o agregado, rendimento, tipologia e área da habitação para aplicar o perfil.

              </p>

            )}



            {profileComplete && !applied && (

              <p className="mt-2 text-center text-[10px] text-[#FFCD4B]">

                Perfil preenchido. Aplica-o para atualizar a análise.

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



            <div className="absolute left-3 top-28 z-[500] w-52 rounded-xl border border-[#1A5268] bg-[#0B1D30]/95 p-3 shadow-xl backdrop-blur lg:top-16">

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



            {/* PAINEL DO MUNICÍPIO */}



            {selectedMunicipality && createPortal(

              <div className="fixed inset-0 z-[1000] flex h-[100dvh] w-screen flex-col overflow-hidden border-0 bg-[#0B1D30] shadow-2xl backdrop-blur lg:left-auto lg:right-4 lg:top-[92px] lg:bottom-4 lg:h-auto lg:w-96 lg:rounded-xl lg:border lg:border-[#1A5268] lg:bg-[#0B1D30]/95">



                {/* CABEÇALHO */}



                <div className="z-10 flex shrink-0 items-start justify-between gap-3 border-b border-[#1A5268] bg-[#0B1D30] px-4 pb-4 pt-4">

                  <div>

                    <div className="mb-2 flex items-center gap-2 text-[#24D9E8]">

                      <MapPin className="h-4 w-4" />



                      <span className="text-[10px] font-semibold uppercase tracking-wider">

                        Município selecionado

                      </span>

                    </div>



                    <h2 className="text-lg font-bold">

                      {selectedMunicipality.nome}

                    </h2>



                    <p className="mt-1 text-xs text-[#9BB2C5]">

                      {selectedMunicipality.distrito_ilha}

                    </p>

                  </div>



                  <button

                    onClick={closeMunicipalityPanel}

                    aria-label="Fechar informação do município"

                    className="rounded-lg p-3.5 text-[#9BB2C5] transition hover:bg-[#10283D] hover:text-white lg:p-2"

                  >

                    <X className="h-4 w-4" />

                  </button>

                </div>



                <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-4 pt-4 overscroll-contain">



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



                {/* DADOS DO INE */}



                <div className="mt-4 border-t border-[#1A5268] pt-4">

                  <h3 className="text-sm font-bold">

                    Rendas de novos contratos

                  </h3>



                  {rentDataLoading && (

                    <p className="mt-3 text-xs text-[#9BB2C5]">

                      A carregar dados do INE...

                    </p>

                  )}



                  {rentDataError && (

                    <p className="mt-3 rounded-lg border border-[#FF6970]/30 bg-[#FF6970]/10 p-3 text-xs text-[#FF6970]">

                      Não foi possível carregar os dados municipais.

                      Confirma se rendas-municipais.json está em public/data.

                    </p>

                  )}



                  {/* CORREÇÃO: só apresentar conteúdo quando rentDataset existe */}



                  {!rentDataLoading && !rentDataError && rentDataset && (

                    <>

                      {annualRent && rentMedianPerM2 !== null ? (

                        <div className="mt-3 rounded-xl border border-[#1A5268] bg-[#10283D] p-3">

                          <p className="text-[10px] text-[#9BB2C5]">

                            Valor mediano por metro quadrado · {referenceYear}

                          </p>



                          <p className="mt-1 text-xl font-bold text-[#24D9E8]">

                            {formatNumber(rentMedianPerM2)} €/m²/mês

                          </p>



                          <p className="mt-2 text-[10px] text-[#9BB2C5]">

                            Novos contratos registados:{" "}

                            {availableContracts !== null

                              ? availableContracts.toLocaleString("pt-PT")

                              : "Não disponível"}

                          </p>

                        </div>

                      ) : (

                        <div className="mt-3 rounded-lg border border-dashed border-[#1A5268] p-3">

                          <p className="text-xs font-semibold text-[#9BB2C5]">

                            Sem dados disponíveis

                          </p>



                          <p className="mt-1 text-[10px] leading-relaxed text-[#9BB2C5]">

                            O INE não publicou um valor para este município

                            no período de referência de {referenceYear ?? "—"}.

                          </p>

                        </div>

                      )}



                      {/* ESTIMATIVA DA RENDA */}



                      {annualRent && rentMedianPerM2 !== null && (

                        <div className="mt-3 rounded-xl border border-[#1A5268] bg-[#10283D] p-3">

                          <p className="text-[10px] text-[#9BB2C5]">

                            Renda mensal estimada

                          </p>



                          {validArea ? (

                            <>

                              <p className="mt-1 text-2xl font-bold">

                                {formatCurrency(

                                  rentMedianPerM2 * areaValue!

                                )}

                              </p>



                              <p className="mt-2 text-[10px] text-[#9BB2C5]">

                                {formatNumber(rentMedianPerM2)} €/m² ×{" "}

                                {formatNumber(areaValue)} m²

                              </p>

                            </>

                          ) : (

                            <p className="mt-2 text-[10px] text-[#9BB2C5]">

                              Preenche e aplica a área da habitação na barra

                              esquerda para obter uma estimativa.

                            </p>

                          )}

                        </div>

                      )}



                      {/* ANÁLISE DE ACESSIBILIDADE */}



                      <div className="mt-4">

                        <h3 className="text-sm font-bold">

                          Análise de acessibilidade

                        </h3>



                        {!applied && (

                          <div className="mt-3 rounded-lg border border-dashed border-[#1A5268] p-3">

                            <p className="text-xs font-semibold text-[#24D9E8]">

                              Perfil por definir

                            </p>



                            <p className="mt-1 text-[10px] leading-relaxed text-[#9BB2C5]">

                              Preenche o perfil familiar na barra esquerda

                              e aplica-o para consultar os indicadores de

                              acessibilidade deste município.

                            </p>

                          </div>

                        )}



                        {applied && (

                          <>

                            {effortRate === null ? (

                              <div className="mt-3 rounded-lg border border-dashed border-[#1A5268] p-3">

                                <p className="text-xs font-semibold text-[#9BB2C5]">

                                  Sem dados para calcular

                                </p>



                                <p className="mt-1 text-[10px] text-[#9BB2C5]">

                                  Não existe um valor de renda publicado

                                  para este município no período selecionado.

                                </p>

                              </div>

                            ) : (

                              <>

                                <div className="mt-3 rounded-xl border border-[#1A5268] bg-[#10283D] p-3">

                                  <div className="flex items-center justify-between gap-2">

                                    <span className="text-xs text-[#9BB2C5]">

                                      Taxa de esforço

                                    </span>



                                    <span

                                      className={`text-xl font-bold tabular-nums ${statusInfo.color}`}

                                    >

                                      {effortRate.toLocaleString("pt-PT", {

                                        maximumFractionDigits: 1,

                                      })}%

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

                                        width: `${Math.min(effortRate, 100)}%`,

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

                                    {formatCurrency(incomeValue)}

                                  </p>



                                  <div className="mt-3 border-t border-[#1A5268] pt-3">

                                    <p className="text-[10px] text-[#9BB2C5]">

                                      Saldo após pagamento da renda

                                    </p>



                                    <p className="mt-1 text-lg font-bold text-[#24D9E8]">

                                      {formatCurrency(remainingAfterRent)}

                                    </p>



                                    <p className="mt-1 text-[10px] leading-relaxed text-[#9BB2C5]">

                                      Não representa poupança. Ainda é

                                      necessário considerar as restantes

                                      despesas mensais.

                                    </p>

                                  </div>

                                </div>

                              </>

                            )}

                          </>

                        )}

                      </div>



                      {/* METODOLOGIA E FONTE */}



                      <div className="mt-3 rounded-lg border border-dashed border-[#1A5268] p-3">

                        <p className="text-[10px] font-semibold text-[#24D9E8]">

                          Fonte e metodologia

                        </p>



                        <p className="mt-2 text-[10px] leading-relaxed text-[#9BB2C5]">

                          Fonte: {rentDataset.metadata.source}.

                        </p>



                        <p className="mt-1 text-[10px] leading-relaxed text-[#9BB2C5]">

                          Indicador INE: {rentDataset.metadata.rentIndicatorId}.

                          Período: {referenceYear}.

                        </p>



                        <p className="mt-1 text-[10px] leading-relaxed text-[#9BB2C5]">

                          Atualização indicada na fonte:{" "}

                          {formatDate(

                            rentDataset.metadata.sourceLastUpdated

                          )}.

                        </p>



                        <a

                          href={rentDataset.metadata.rentSourceUrl}

                          target="_blank"

                          rel="noopener noreferrer"

                          className="mt-2 inline-block text-[10px] font-semibold text-[#24D9E8] hover:underline"

                        >

                          Consultar indicador no INE

                        </a>



                        <p className="mt-3 text-[10px] leading-relaxed text-[#9BB2C5]">

                          A renda estimada resulta da multiplicação do

                          valor mediano dos novos contratos por m² pela

                          área indicada. Não representa a mediana efetiva

                          das rendas de uma tipologia nem o preço atual

                          de mercado.

                        </p>



                        <p className="mt-2 text-[10px] leading-relaxed text-[#9BB2C5]">

                          A tipologia selecionada é uma preferência do

                          utilizador. O indicador utilizado não está

                          desagregado por tipologia.

                        </p>



                        {coverage && (

                          <p className="mt-2 text-[10px] text-[#9BB2C5]">

                            Cobertura nacional em {referenceYear}:{" "}

                            {coverage.availableMunicipalities} de 308

                            municípios com dados publicados.

                          </p>

                        )}

                      </div>

                    </>

                  )}

                </div>

                </div>

              </div>,
              document.body
            )}



            {/* RESUMO DO PERFIL */}



            <div className="absolute bottom-4 left-4 z-[500] max-w-[85%] rounded-lg border border-[#1A5268] bg-[#0B1D30]/95 px-3 py-2 text-[10px] text-[#9BB2C5] shadow-lg backdrop-blur">

              Perfil:{" "}

              {household ? `${household} pessoas` : "Agregado por definir"}

              {" · "}

              {validIncome && incomeValue !== null

                ? formatCurrency(incomeValue)

                : "Rendimento por definir"}

              {" · "}

              {typology ?? "Tipologia por definir"}

              {" · "}

              {validArea && areaValue !== null

                ? `${formatNumber(areaValue)} m²`

                : "Área por definir"}

            </div>



          </main>

        </div>

      </div>

      <Toast
        open={showProfileSuccess}
        onClose={closeProfileSuccess}
        title="Perfil aplicado com sucesso!"
        description="Os resultados de acessibilidade foram atualizados."
        duration={3500}
      />

    </AppShell>

  );

}
