
"use client";

import dynamic from "next/dynamic";

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

export default function PortugalMapLoader() {
  return <PortugalMap />;
}
