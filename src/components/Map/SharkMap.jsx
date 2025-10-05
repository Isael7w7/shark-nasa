// src/components/Map/SharkMap.jsx (VERSIÓN CON PREDICCIONES)

import React from 'react';
import { Polyline, CircleMarker, Tooltip, Marker } from 'react-leaflet';
import L from 'leaflet';
import BaseMap from './BaseMap.jsx';
import SharkMarker from './SharkMarker.jsx';
import './SharkMap.css';

// Importar el ícono del tiburón para la posición actual
import sharkIconPng from '../../assets/tiburon.png';

// Crear ícono especial para la posición actual (más grande y destacado)
// IMPORTANTE: Usar exactamente la misma configuración que los otros markers
const currentPositionIcon = L.icon({
  iconUrl: sharkIconPng,
  iconSize: [70, 70],
  iconAnchor: [35, 35], // CRÍTICO: debe ser exactamente la mitad de iconSize
  popupAnchor: [0, -35],
  tooltipAnchor: [0, 0],
  className: 'shark-current-position'
});

/**
 * Componente principal del mapa que renderiza los marcadores y predicciones.
 * @param {{ sharks: Array<any>, selectedSharkId: string | null, onSelectShark: (id: string) => void, predictionData: Object | null }} props
 */
export default function SharkMap({ sharks, selectedSharkId, onSelectShark, predictionData }) {
  // Encontramos el objeto completo del tiburón seleccionado para centrar el mapa en él.
  const selectedShark = sharks.find(s => s.id === selectedSharkId);

  // Si hay datos de predicción, centramos en la posición actual de la predicción
  // Si no, usamos la posición del shark del array normal
  let mapCenter = [26.5, -85.0]; // Default

  if (predictionData && predictionData.currentPosition && selectedSharkId === predictionData.sharkId) {
    // Usar la posición actual de la predicción
    mapCenter = [predictionData.currentPosition.latitude, predictionData.currentPosition.longitude];
  } else if (selectedShark && selectedShark.position) {
    // Usar la posición del shark normal
    mapCenter = selectedShark.position;
  }

  // Renderizar el historial de posiciones (usedPositions menos la última que es la actual)
  const renderHistory = () => {
    if (!predictionData || !predictionData.usedPositions) return null;

    const allPositions = predictionData.usedPositions;
    const historyPositions = allPositions.slice(0, -1); // Todas menos la última

    console.log("Historial completo (usedPositions):", allPositions);
    console.log("Posiciones históricas (sin la actual):", historyPositions);

    return (
      <>
        {/* Línea conectando TODAS las posiciones históricas incluyendo la actual */}
        <Polyline
          positions={allPositions.map(pos => [pos.latitude, pos.longitude])}
          pathOptions={{
            color: '#FFB74D',
            weight: 3,
            opacity: 0.7,
            dashArray: '10, 5'
          }}
        />

        {/* Marcadores para cada posición histórica (sin incluir la actual) */}
        {historyPositions.map((pos, idx) => (
          <CircleMarker
            key={`history-${idx}`}
            center={[pos.latitude, pos.longitude]}
            radius={6}
            pathOptions={{
              color: '#FF9800',
              fillColor: '#FFB74D',
              fillOpacity: 0.6,
              weight: 2
            }}
          >
            <Tooltip permanent={false}>
              Historial {idx + 1}
              {pos.trackingDateTime && (
                <>
                  <br />
                  {new Date(pos.trackingDateTime).toLocaleString('es-ES', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </>
              )}
            </Tooltip>
          </CircleMarker>
        ))}
      </>
    );
  };  // Renderizar la posición actual con el ícono del tiburón
  const renderCurrentPosition = () => {
    if (!predictionData || !predictionData.currentPosition) return null;

    const current = predictionData.currentPosition;

    console.log("Renderizando tiburón en posición actual:", current);

    return (
      <Marker
        position={[current.latitude, current.longitude]}
        icon={currentPositionIcon}
        zIndexOffset={1000}
      >
        <Tooltip permanent={false}>
          <strong>Posición Actual</strong>
          <br />
          {predictionData.sharkName}
          {current.trackingDateTime && (
            <>
              <br />
              {new Date(current.trackingDateTime).toLocaleString('es-ES', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </>
          )}
        </Tooltip>
      </Marker>
    );
  };

  // Renderizar las predicciones futuras
  const renderPredictions = () => {
    if (!predictionData || !predictionData.predictedPositions) return null;

    const predictions = predictionData.predictedPositions;
    const currentPosition = predictionData.currentPosition;

    // Crear array completo desde posición actual hasta todas las predicciones
    const fullPath = [
      [currentPosition.latitude, currentPosition.longitude],
      ...predictions.map(p => [p.latitude, p.longitude])
    ];

    return (
      <>
        {/* Línea de predicción */}
        <Polyline
          positions={fullPath}
          pathOptions={{
            color: '#42A5F5',
            weight: 3,
            opacity: 0.8,
            dashArray: '5, 10'
          }}
        />

        {/* Marcadores para cada predicción */}
        {predictions.map((pred, idx) => {
          // Calculamos la opacidad basada en la iteración (más lejanas son más transparentes)
          const opacity = Math.max(0.3, 1 - (idx / predictions.length) * 0.6);

          return (
            <CircleMarker
              key={`prediction-${idx}`}
              center={[pred.latitude, pred.longitude]}
              radius={5}
              pathOptions={{
                color: '#1976D2',
                fillColor: '#42A5F5',
                fillOpacity: opacity,
                weight: 2
              }}
            >
              <Tooltip permanent={false}>
                Predicción {pred.iteration}<br />
                {new Date(pred.predictedFor).toLocaleString('es-ES', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </Tooltip>
            </CircleMarker>
          );
        })}
      </>
    );
  };

  return (
    <div className="map-wrapper">
      <BaseMap center={mapCenter} zoom={8}>
        {/* Renderizar historial y predicciones primero (abajo en z-index) */}
        {predictionData && selectedSharkId && parseInt(selectedSharkId) === predictionData.sharkId && (
          <>
            {renderHistory()}
            {renderPredictions()}
            {renderCurrentPosition()}
          </>
        )}

        {/* Renderizar marcadores de tiburones normales (solo si no hay predicción activa o es otro tiburón) */}
        {sharks.map(shark => {
          // No renderizar el marcador normal si es el tiburón con predicción activa
          if (predictionData && shark.id === predictionData.sharkId) {
            return null;
          }

          return (
            <SharkMarker
              key={shark.id}
              sharkData={shark}
              isSelected={shark.id === selectedSharkId}
              onSelect={onSelectShark}
            />
          );
        })}
      </BaseMap>

      {/* Leyenda del mapa */}
      {predictionData && selectedSharkId && parseInt(selectedSharkId) === predictionData.sharkId && (
        <div className="map-legend">
          <h4>Leyenda</h4>
          <div className="legend-item">
            <span className="legend-line history"></span>
            <span>Historial de movimiento</span>
          </div>
          <div className="legend-item">
            <span className="legend-marker current"></span>
            <span>Posición actual</span>
          </div>
          <div className="legend-item">
            <span className="legend-line prediction"></span>
            <span>Predicción futura</span>
          </div>
        </div>
      )}
    </div>
  );
}