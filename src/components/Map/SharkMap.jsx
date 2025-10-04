// src/components/Map/SharkMap.jsx (VERSIÓN COMPLETA CON MAPA REAL)

import React from 'react';
import BaseMap from './BaseMap.jsx';
import SharkMarker from './SharkMarker.jsx';
import './SharkMap.css';

/**
 * Componente principal del mapa que renderiza los marcadores.
 * @param {{ sharks: Array<any>, selectedSharkId: string | null, onSelectShark: (id: string) => void }} props
 */
export default function SharkMap({ sharks, selectedSharkId, onSelectShark }) {
  // Encontramos el objeto completo del tiburón seleccionado para centrar el mapa en él.
  const selectedShark = sharks.find(s => s.id === selectedSharkId);

  // Si no hay tiburones o no se encuentra el seleccionado, usamos una posición por defecto.
  const mapCenter = selectedShark ? selectedShark.position : [26.5, -85.0];

  return (
    <div className="map-wrapper">
      <BaseMap center={mapCenter} zoom={8}>
        {sharks.map(shark => (
          <SharkMarker
            key={shark.id}
            sharkData={shark}
            isSelected={shark.id === selectedSharkId}
            onSelect={onSelectShark}
          />
        ))}
      </BaseMap>
      {/* Aquí podrías añadir controles del mapa y leyenda si lo deseas */}
    </div>
  );
}