"use client";
import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";

  interface sebaranProps {
    nama: string,
    desc: string,
    lat: number,
    lng: number
  }

const sebaranSunda:sebaranProps[] = [
  { nama: "Bandung", desc: "Pusat budaya Sunda.", lat: -6.9175, lng: 107.6191 },
  { nama: "Bogor", desc: "Wilayah budaya Sunda.", lat: -6.5971, lng: 106.8060 },
  { nama: "Cirebon", desc: "Campuran Sunda dan Jawa.", lat: -6.7063, lng: 108.5570 },
  { nama: "Tasikmalaya", desc: "Wilayah Priangan Timur.", lat: -7.3274, lng: 108.2207 },
];

export default function SundaMap() {
  return (
    <MapContainer
      scrollWheelZoom={false}
      dragging={false}
      zoomControl={false}
      doubleClickZoom={false}
      touchZoom={false}
      boxZoom={false}
      keyboard={false}
      center={[-6.9, 107.6]}
      className="h-[200px] rounded-xl shadow-xl"
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
  );
}
