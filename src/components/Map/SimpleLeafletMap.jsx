// src/components/Map/SimpleLeafletMap.jsx

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'; // Importamos la librería 'leaflet' directamente

// Importamos nuestro icono de tiburón desde la carpeta de assets
import sharkIconPng from '../../assets/Shark-Free-Download-PNG.webp';

import 'leaflet/dist/leaflet.css';

// 1. CREACIÓN DEL ICONO PERSONALIZADO
// Usamos la clase L.Icon de la librería leaflet para definir nuestro propio icono.
const sharkIcon = new L.Icon({
  iconUrl: sharkIconPng,       // La imagen que importamos
  iconSize: [70, 70],          // El tamaño del icono en píxeles [ancho, alto]
  iconAnchor: [40, 40],        // El punto del icono que corresponderá a la coordenada del mapa
  popupAnchor: [0, -25],       // Dónde se debe abrir el popup en relación al icono
});


const SimpleLeafletMap = () => {
  // 2. ESTADO PARA LA POSICIÓN DEL TIBURÓN
  // Guardamos la posición en un estado para que React actualice el mapa cuando cambie.
  const [position, setPosition] = useState([26.5, -85.0]);

  // 3. EFECTO PARA SIMULAR EL MOVIMIENTO
  // useEffect nos permite ejecutar código después de que el componente se renderiza.
  useEffect(() => {
    // setInterval ejecuta una función repetidamente cada cierto tiempo.
    const interval = setInterval(() => {
      // Calculamos una nueva posición aleatoria cerca de la anterior
      setPosition(currentPosition => [
        currentPosition[0] + (Math.random() - 0.5) * 0.05,
        currentPosition[1] + (Math.random() - 0.5) * 0.01,

      ]);
    }, 2000); // Se ejecuta cada 2000 milisegundos (2 segundos)

    // Función de limpieza: se ejecuta cuando el componente se "desmonta".
    // Esto es crucial para evitar fugas de memoria.
    return () => clearInterval(interval);
  }, []); // El array vacío [] significa que este efecto solo se ejecuta una vez, al montar el componente.

  return (
    <MapContainer
      center={position}
      zoom={7}
      style={{ height: '100vh', width: '100vw' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* 4. RENDERIZADO DEL MARCADOR DEL TIBURÓN */}
      <Marker position={position} icon={sharkIcon}>
        <Popup>
          Ultima Ubicacion del tiburon duende.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default SimpleLeafletMap;