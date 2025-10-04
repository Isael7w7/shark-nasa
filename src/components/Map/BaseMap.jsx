// src/components/Map/BaseMap.jsx

import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Este componente ahora solo renderiza el mapa. ¡Es súper reutilizable!
// Recibe su centro, zoom y los "hijos" que debe renderizar dentro (como el tiburón).
const BaseMap = ({ center, zoom, children }) => {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: '100vh', width: '100vw' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* Aquí se renderizará cualquier cosa que le pasemos, como nuestro SharkMarker */}
      {children}
    </MapContainer>
  );
};

export default BaseMap;