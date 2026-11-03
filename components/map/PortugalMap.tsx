
"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import L from "leaflet";

export default function PortugalMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container || mapRef.current) return;

    // Criar o mapa
    const map = L.map(container, {
      center: [39.6, -8.0],
      zoom: 6,
      minZoom: 5,
      maxZoom: 13,
      zoomControl: false,
      scrollWheelZoom: true,
    });

    mapRef.current = map;

    // Camada OpenStreetMap
    L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }
    ).addTo(map);

    // Corrigir dimensões após a montagem
    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-full min-h-[500px] w-full bg-[#06111F]"
    />
  );
}
