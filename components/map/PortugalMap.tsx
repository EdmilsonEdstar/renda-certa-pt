
"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function PortugalMap() {
  return (
    <MapContainer
      center={[39.6, -8.0]}
      zoom={6}
      minZoom={5}
      maxZoom={13}
      scrollWheelZoom={true}
      zoomControl={false}
      className="h-full w-full bg-[#06111F]"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}
