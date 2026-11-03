"use client";

import dynamic from "next/dynamic";
import type { MunicipalityProperties } from "./PortugalMap";

type PortugalMapLoaderProps = {
  onMunicipalitySelect?: (
    municipality: MunicipalityProperties
  ) => void;
};

const PortugalMap = dynamic(
  () => import("./PortugalMap"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[600px] w-full items-center justify-center rounded-2xl border border-border bg-surface">
        <p className="text-sm text-muted-foreground">
          A preparar o mapa de Portugal...
        </p>
      </div>
    ),
  }
);

export default function PortugalMapLoader({
  onMunicipalitySelect,
}: PortugalMapLoaderProps) {
  return (
    <PortugalMap
      onMunicipalitySelect={onMunicipalitySelect}
    />
  );
}