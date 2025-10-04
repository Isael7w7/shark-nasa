// src/pages/TrackerPage.jsx (VERSIÓN COMPLETA CON SELECCIÓN)

import React, { useState, useEffect } from 'react';
import BaseMap from '../components/Map/BaseMap.jsx';
import SharkMarker from '../components/Map/SharkMarker.jsx';
import InfoPanel from '../components/UI/InfoPanel.jsx';
import { sharkService } from '../services/sharkTrackerService.js';

const TrackerPage = () => {
  // El estado de 'sharks' se mantiene igual.
  const [sharks, setSharks] = useState([]);

  // --- CAMBIO #1: NUEVO ESTADO PARA EL TIBURÓN SELECCIONADO ---
  // Guardaremos el ID del tiburón que el usuario ha seleccionado.
  // Por defecto, al inicio no hay ninguno seleccionado (null).
  const [selectedSharkId, setSelectedSharkId] = useState(null);

  // El useEffect para obtener los datos de los tiburones se mantiene igual.
  useEffect(() => {
    const unsubscribe = sharkService.listenForSharkUpdates(allSharksData => {
      setSharks(allSharksData);
    });
    return unsubscribe;
  }, []);

  // --- CAMBIO #2: FUNCIÓN PARA MANEJAR LA SELECCIÓN ---
  // Esta función será llamada por el componente SharkMarker cuando se le haga clic.
  // Recibe el ID del tiburón y lo guarda en nuestro nuevo estado.
  const handleSharkSelect = (sharkId) => {
    console.log(`Tiburón seleccionado: ${sharkId}`); // Útil para depurar
    setSelectedSharkId(sharkId);
  };

  if (sharks.length === 0) {
    return <div>Cargando datos de rastreo...</div>;
  }

  // --- CAMBIO #3: ENCONTRAR EL OBJETO DEL TIBURÓN SELECCIONADO ---
  // Buscamos en nuestro array de tiburones el objeto completo que coincide con el ID seleccionado.
  // Si no hay ninguno seleccionado, mostramos el primero por defecto.
  const selectedShark = sharks.find(shark => shark.id === selectedSharkId) || sharks[0];

  return (
    <>
      <BaseMap center={selectedShark.position} zoom={8}>
        {sharks.map(shark => (
          <SharkMarker
            key={shark.id}
            sharkData={shark}
            // --- CAMBIO #4: PASAMOS LA FUNCIÓN DE SELECCIÓN Y EL ESTADO DE SELECCIÓN ---
            // Le damos al marcador la capacidad de notificar a la página cuando es clickeado.
            onSelect={handleSharkSelect}
            // Le decimos al marcador si él es el que está seleccionado actualmente.
            isSelected={shark.id === selectedSharkId}
          />
        ))}
      </BaseMap>

      {/* --- CAMBIO #5: PASAMOS EL TIBURÓN SELECCIONADO AL PANEL DE INFO --- */}
      {/* El panel ahora siempre mostrará la información del 'selectedShark'. */}
      <InfoPanel sharkInfo={selectedShark} />
    </>
  );
};

export default TrackerPage;