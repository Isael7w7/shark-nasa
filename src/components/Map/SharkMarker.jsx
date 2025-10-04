// src/components/Map/SharkMarker.jsx (VERSIÓN COMPLETA CON EVENTOS)

import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

import { useSmoothMovement } from '../../hooks/useSmoothMovement.jsx';
import sharkIconPng from '../../assets/Shark-Free-Download-PNG.webp';

// --- CAMBIO #1: CREAMOS DOS ICONOS, UNO NORMAL Y OTRO RESALTADO ---
// Esto mejorará la UX al mostrar visualmente cuál tiburón está seleccionado.

// Icono normal
const defaultIcon = new L.Icon({
  iconUrl: sharkIconPng,
  iconSize: [70, 70],
  iconAnchor: [35, 35],
  popupAnchor: [0, -35],
  className: 'shark-marker-default' // Añadimos una clase para estilos (opcional)
});

// Icono para el tiburón seleccionado (un poco más grande y con un filtro de brillo)
const selectedIcon = new L.Icon({
  iconUrl: sharkIconPng,
  iconSize: [90, 90], // Más grande
  iconAnchor: [45, 45],
  popupAnchor: [0, -45],
  className: 'shark-marker-selected' // Clase CSS para aplicar un filtro
});


// --- CAMBIO #2: EL COMPONENTE AHORA RECIBE 'onSelect' y 'isSelected' ---
const SharkMarker = ({ sharkData, onSelect, isSelected }) => {
  const animatedPosition = useSmoothMovement(sharkData.position);

  if (!animatedPosition) return null;

  // --- CAMBIO #3: LÓGICA PARA MANEJAR EL CLIC ---
  // Creamos un manejador que, al ser llamado, invoca la función 'onSelect'
  // que nos pasó la página, enviándole el ID de este tiburón específico.
  const eventHandlers = {
    click: () => {
      onSelect(sharkData.id);
    },
  };

  return (
    <Marker
      position={animatedPosition}
      // --- CAMBIO #4: ELEGIMOS EL ICONO BASADO EN SI ESTÁ SELECCIONADO ---
      icon={isSelected ? selectedIcon : defaultIcon}
      // --- CAMBIO #5: AÑADIMOS EL MANEJADOR DE EVENTOS AL MARCADOR ---
      eventHandlers={eventHandlers}
    >
      <Popup>
        {sharkData.name} - ID: {sharkData.id}
      </Popup>
    </Marker>
  );
};

export default SharkMarker;