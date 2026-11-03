"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import L from "leaflet";

export type MunicipalityProperties = {
  codigo: string;
  nome: string;
  distrito_ilha: string;
  nuts3: string;
  area_ha: number;
};

type PortugalMapProps = {
  onMunicipalitySelect?: (
    municipality: MunicipalityProperties
  ) => void;
};

export default function PortugalMap({
  onMunicipalitySelect,
}: PortugalMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  const onMunicipalitySelectRef = useRef(onMunicipalitySelect);

  useEffect(() => {
    onMunicipalitySelectRef.current = onMunicipalitySelect;
  }, [onMunicipalitySelect]);

  useEffect(() => {
    const container = containerRef.current;

    if (!container || mapRef.current) return;

    const map = L.map(container, {
      center: [39.6, -8.0],
      zoom: 6,
      minZoom: 5,
      maxZoom: 13,
      zoomControl: false,
      scrollWheelZoom: true,
    });

    mapRef.current = map;

    L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }
    ).addTo(map);

    let municipalityLayer: L.GeoJSON | null = null;
    let selectedLayer: L.Layer | null = null;
    let cancelled = false;

    const normalStyle: L.PathOptions = {
      color: "#24D9E8",
      weight: 1,
      opacity: 0.65,
      fillColor: "#24D9E8",
      fillOpacity: 0.04,
    };

    const selectedStyle: L.PathOptions = {
      color: "#24D9E8",
      weight: 2.5,
      opacity: 1,
      fillColor: "#24D9E8",
      fillOpacity: 0.25,
    };

    const loadMunicipalities = async () => {
      try {
        const response = await fetch("/data/municipios.geojson");

        if (!response.ok) {
          throw new Error(
            `Erro HTTP ${response.status} ao carregar municípios.`
          );
        }

        const data = await response.json();

        if (cancelled || !mapRef.current) return;

        const layer = L.geoJSON(data, {
          style: () => ({ ...normalStyle }),

          onEachFeature: (feature, featureLayer) => {
            const properties =
              feature.properties as MunicipalityProperties;

            featureLayer.bindTooltip(properties.nome, {
              sticky: true,
              direction: "top",
            });

            featureLayer.on("mouseover", () => {
              if (featureLayer !== selectedLayer) {
                (featureLayer as L.Path).setStyle({
                  weight: 2,
                  fillOpacity: 0.15,
                });
              }
            });

            featureLayer.on("mouseout", () => {
              if (
                featureLayer !== selectedLayer &&
                municipalityLayer
              ) {
                municipalityLayer.resetStyle(featureLayer);
              }
            });

            featureLayer.on("click", () => {
              if (selectedLayer && municipalityLayer) {
                municipalityLayer.resetStyle(selectedLayer);
              }

              selectedLayer = featureLayer;

              (featureLayer as L.Path).setStyle(selectedStyle);

              onMunicipalitySelectRef.current?.(properties);
            });
          },
        });

        if (cancelled || !mapRef.current) return;

        municipalityLayer = layer;
        layer.addTo(map);
      } catch (error) {
        if (!cancelled) {
          console.error("Erro ao carregar GeoJSON:", error);
        }
      }
    };

    loadMunicipalities();

    const resizeObserver = new ResizeObserver(() => {
      if (mapRef.current) {
        map.invalidateSize();
      }
    });

    resizeObserver.observe(container);

    return () => {
      cancelled = true;
      resizeObserver.disconnect();

      if (mapRef.current === map) {
        map.remove();
        mapRef.current = null;
      }

      municipalityLayer = null;
      selectedLayer = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-full min-h-[500px] w-full bg-[#06111F]"
    />
  );
}