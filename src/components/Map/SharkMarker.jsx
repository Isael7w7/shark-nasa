// src/components/Map/SharkMarker.jsx (VERSIÓN CORREGIDA)

import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

import { useSmoothMovement } from '../../hooks/useSmoothMovement';
// VERIFICA ESTA LÍNEA CUIDADOSAMENTE. EL NOMBRE DEL ARCHIVO DEBE SER EXACTO.
import sharkIconPng from '../../assets/tiburon.png';

const sharkIcon = new L.Icon({
  iconUrl: sharkIconPng,
  iconSize: [70, 70],
  iconAnchor: [35, 35],
  popupAnchor: [0, -35],
});

const SharkMarker = ({ sharkData }) => {
  const animatedPosition = useSmoothMovement(sharkData.position);

  if (!animatedPosition) return null;

  return (
    <Marker position={animatedPosition} icon={sharkIcon}>
      <Popup>
        {sharkData.name} - ID: {sharkData.id}
      </Popup>
    </Marker>
  );
};

export default SharkMarker;