// src/pages/TrackerPage.jsx (VERSIÓN COMPLETA Y CORREGIDA)

import React, { useState, useEffect } from 'react'; // Asegúrate de importar useState y useEffect
import BaseMap from '../components/Map/BaseMap.jsx';
import SharkMarker from '../components/Map/SharkMarker.jsx';
import InfoPanel from '../components/UI/InfoPanel.jsx';
import { sharkService } from '../services/sharkTrackerService.js';

const TrackerPage = () => {
  // 1. LÓGICA DE ESTADO (la parte que faltaba)
  // Crea la variable 'sharks' y la función para actualizarla.
  const [sharks, setSharks] = useState([]);

  // 2. LÓGICA DE OBTENCIÓN DE DATOS (la parte que faltaba)
  // Se conecta al servicio cuando el componente se monta.
  useEffect(() => {
    const unsubscribe = sharkService.listenForSharkUpdates(allSharksData => {
      setSharks(allSharksData);
    });
    return unsubscribe;
  }, []);

  // La lógica de carga es correcta y ahora funcionará porque 'sharks' existe.
  if (sharks.length === 0) {
    return <div>Cargando datos de rastreo...</div>;
  }

  // El JSX que ya tenías está perfecto.
  return (
    <>
      <BaseMap center={sharks[0].position} zoom={7}>
        {sharks.map(shark => (
          <SharkMarker
            key={shark.id}
            sharkData={shark}
          />
        ))}
      </BaseMap>
      <InfoPanel sharkInfo={sharks[0]} />
    </>
  );
};

export default TrackerPage;