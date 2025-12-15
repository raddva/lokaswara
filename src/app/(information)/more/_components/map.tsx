/* eslint-disable react-hooks/purity */
'use client'

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";

interface SebaranProps {
  nama: string;
  desc: string;
  lat: number;
  lng: number;
}

const sebaranSunda: SebaranProps[] = [
  { nama: "Bandung", desc: "Pusat budaya Sunda.", lat: -6.9175, lng: 107.6191 },
  { nama: "Bogor", desc: "Wilayah budaya Sunda.", lat: -6.5971, lng: 106.8060 },
  { nama: "Cirebon", desc: "Campuran Sunda dan Jawa.", lat: -6.7063, lng: 108.5570 },
  { nama: "Tasikmalaya", desc: "Wilayah Priangan Timur.", lat: -7.3274, lng: 108.2207 },
];

export default function SundaMap() {
  const [mapKey, setMapKey] = useState(Date.now());

  useEffect(() => {
    setMapKey(Date.now());
  }, []);

  return (
    <div className="w-full rounded-xl shadow-xl overflow-hidden">
      <MapContainer
        key={mapKey}
        center={[-6.9, 107.6]}
        zoom={8}
        scrollWheelZoom={false}
        dragging={true}
        doubleClickZoom={false}
        touchZoom={true}
        boxZoom={false}
        keyboard={false}
        style={{ height: "300px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {sebaranSunda.map((loc, i) => (
          <Marker key={i} position={[loc.lat, loc.lng]}>
            <Popup>
              <h2 className="text-lg font-semibold">{loc.nama}</h2>
              <p className="text-gray-600">{loc.desc}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
