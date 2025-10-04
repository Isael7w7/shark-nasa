// src/pages/TrackerPage.jsx (VERSIÓN MULTI-TIBURÓN)

import React, { useState, useEffect } from 'react';
import BaseMap from '../components/Map/BaseMap.jsx';
import SharkMarker from '../components/Map/SharkMarker.jsx';
import InfoPanel from '../components/UI/InfoPanel.jsx';
import { sharkService } from '../services/sharkTrackerService.js';

const TrackerPage = () => {
  // 1. El estado ahora guardará un array de tiburones.
  const [sharks, setSharks] = useState([]);

  // 2. Nos suscribimos al servicio para obtener el array.
  useEffect(() => {
    const unsubscribe = sharkService.listenForSharkUpdates(allSharksData => {
      setSharks(allSharksData);
    });
    return unsubscribe;
  }, []);

  // Si aún no han cargado los datos de los tiburones, no mostramos nada.
  if (sharks.length === 0) {
    return <div>Cargando datos de rastreo...</div>; // O un spinner de carga
  }

  return (
    <div style={{ position: 'relative' }}>
      {/* Centramos el mapa en la posición del primer tiburón de la lista */}
      <BaseMap center={sharks[0].position} zoom={7}>
        {/* 3. Usamos .map() para crear un componente por cada tiburón en nuestro estado */}
        {sharks.map(shark => (
          <SharkMarker
            key={shark.id} // La 'key' es crucial para que React optimice la lista
            sharkData={shark} // Pasamos los datos completos de UN tiburón
          />
        ))}
      </BaseMap>

      {/* Por ahora, el InfoPanel mostrará los datos del primer tiburón */}
      <InfoPanel sharkInfo={sharks[0]} />
    </div>
  );
};

export default TrackerPage;