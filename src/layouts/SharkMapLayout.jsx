// src/layouts/SharkMapLayout.jsx (CÓDIGO COMPLETO CON PREDICCIONES)

import React, { useState, useEffect } from 'react';
import Header from '../components/navigation/header.jsx';
import Sidebar from '../components/navigation/Sidebar.jsx';
import SharkMap from '../components/Map/SharkMap.jsx'; // Nuestro mapa de Leaflet
import { sharkService } from '../services/sharkTrackerService.js';
import './SharkMapLayout.css';

// - #1: Definimos los posibles estados de carga ---
const STATUS = {
  IDLE: 'idle', // Inactivo
  LOADING: 'loading', // Cargando
  SUCCESS: 'success', // Éxito
  ERROR: 'error',   // Error
};

export default function SharkMapLayout() {
  const [sharks, setSharks] = useState([]);
  const [selectedSharkId, setSelectedSharkId] = useState(null);
  const [predictionData, setPredictionData] = useState(null);
  const [loadingPredictions, setLoadingPredictions] = useState(false);

  // --- #2: Creamos un nuevo estado para rastrear el estado de la petición ---
  const [loadingStatus, setLoadingStatus] = useState(STATUS.IDLE);

  // Efecto para cargar los datos de los tiburones
  useEffect(() => {
    // Ponemos el estado en 'cargando' al inicio
    setLoadingStatus(STATUS.LOADING);

    // --- #3: Modificamos la firma del servicio (opcional pero recomendado) ---
    // Ahora nuestro servicio nos dirá si hubo un error.
    const unsubscribe = sharkService.listenForSharkUpdates(
      (allSharksData) => { // Callback de éxito
        setSharks(allSharksData);
        setLoadingStatus(STATUS.SUCCESS); // Marcamos como éxito
        if (!selectedSharkId && allSharksData.length > 0) {
          // Por defecto seleccionamos el tiburón con ID 3 (Bruce)
          const bruce = allSharksData.find(s => s.id === 3);
          if (bruce) {
            setSelectedSharkId(3);
          } else {
            setSelectedSharkId(allSharksData[0].id);
          }
        }
      },
      (error) => { // Callback de error (necesitaremos añadir esto al servicio)
        console.error("Layout recibió un error del servicio:", error);
        setLoadingStatus(STATUS.ERROR); // Marcamos como error
      }
    );
    return unsubscribe;
  }, []);

  // Efecto para cargar las predicciones cuando se selecciona el tiburón ID 3
  useEffect(() => {
    if (selectedSharkId === 3) {
      loadPredictions(3);
    } else {
      setPredictionData(null);
    }
  }, [selectedSharkId]);

  const loadPredictions = async (sharkId) => {
    setLoadingPredictions(true);
    try {
      const data = await sharkService.getPredictions(sharkId, 20);
      setPredictionData(data);
      console.log("Datos de predicción cargados:", data);
    } catch (error) {
      console.error("Error cargando predicciones:", error);
      setPredictionData(null);
    } finally {
      setLoadingPredictions(false);
    }
  };

  const handleSelectShark = (id) => {
    setSelectedSharkId(id);
  };

  return (
    <div className="shark-map-layout">
      <Header />
      <div className="main-content-area">
        <Sidebar
          sharks={sharks}
          onSelectShark={handleSelectShark}
          selectedSharkId={selectedSharkId}
          // Pasamos el estado de carga a la sidebar para que también pueda reaccionar
          loadingStatus={loadingStatus}
        />
        <main className="map-container">
          {/* ---#4: Lógica de renderizado condicional basada en el estado --- */}
          {loadingStatus === STATUS.LOADING && (
            <div className="status-overlay">Cargando datos de rastreo...</div>
          )}

          {loadingStatus === STATUS.ERROR && (
            <div className="status-overlay error">
              <h2>Error de Conexión</h2>
              <p>No se pudo conectar con el servidor. Por favor, asegúrate de que el backend esté corriendo y refresca la página.</p>
            </div>
          )}

          {(loadingStatus === STATUS.SUCCESS || loadingStatus === STATUS.ERROR) && (
            // Mostramos el mapa tanto en éxito como en error (para tener un fallback visual)
            <SharkMap
              sharks={sharks} // Estará vacío si hubo un error, pero el mapa se renderizará
              selectedSharkId={selectedSharkId}
              onSelectShark={handleSelectShark}
              predictionData={predictionData}
            />
          )}

          {loadingPredictions && (
            <div className="prediction-loader">
              Cargando predicciones...
            </div>
          )}
        </main>
      </div>
    </div>
  );
}