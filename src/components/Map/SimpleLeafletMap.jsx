// src/components/Map/SimpleLeafletMap.jsx

import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

// 1. IMPORTANTE: Importa los estilos CSS de Leaflet. Sigue siendo crucial.
import 'leaflet/dist/leaflet.css';

const SimpleLeafletMap = () => {
  // Coordenadas de Miami [latitud, longitud]
  const position = [25.7617, -80.1918]; // Nota: ya no tiene ": [number, number]"

  return (
    <MapContainer
      center={position}
      zoom={10}
      style={{ height: '100vh', width: '100vw' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};

export default SimpleLeafletMap;