import React, { useState, useEffect } from 'react';
import Header from '../components/navigation/header.jsx';
import Sidebar from '../components/navigation/Sidebar.jsx';
import SharkMap from '../components/Map/SharkMap.jsx'; 
import { sharkService } from '../services/sharkTrackerService.js';
import './SharkMapLayout.css';

// - #1: Definimos los posibles estados de carga ---
const STATUS = {
  IDLE: 'idle', 
  LOADING: 'loading', 
  SUCCESS: 'success', 
  ERROR: 'error', 
};

// --- Importa tu imagen de error aquí ---
import errorImage from "../assets/error.png"; 

export default function SharkMapLayout() {
  const [sharks, setSharks] = useState([]);
  const [selectedSharkId, setSelectedSharkId] = useState(null);
  const [predictionData, setPredictionData] = useState(null);
  const [loadingPredictions, setLoadingPredictions] = useState(false);

  const [loadingStatus, setLoadingStatus] = useState(STATUS.IDLE);

  // Efecto para cargar los datos de los tiburones
  useEffect(() => {
    setLoadingStatus(STATUS.LOADING);

    const unsubscribe = sharkService.listenForSharkUpdates(
      (allSharksData) => { 
        setSharks(allSharksData);
        setLoadingStatus(STATUS.SUCCESS); 
        if (!selectedSharkId && allSharksData.length > 0) {
          const bruce = allSharksData.find(s => s.id === 3);
          if (bruce) {
            setSelectedSharkId(3);
          } else {
            setSelectedSharkId(allSharksData[0].id);
          }
        }
      },
      (error) => { 
        console.error("Layout recibió un error del servicio:", error);
        setLoadingStatus(STATUS.ERROR); 
      }
    );
    return unsubscribe;
  }, []);

  // Efecto para cargar las predicciones
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
          loadingStatus={loadingStatus}
        />
        <main className="map-container">
          {loadingStatus === STATUS.LOADING && (
            <div className="status-overlay">Cargando datos de rastreo...</div>
          )}

          {loadingStatus === STATUS.ERROR && (
            <div className="status-overlay error">
              {/* IMAGEN DE ERROR AÑADIDA */}
              <img src={errorImage} alt="Error de Conexión" className="error-icon" />
              
              <h2>Error de Conexión</h2>
              <p>No se pudo conectar con el servidor. Por favor, asegúrate de que el backend esté corriendo y refresca la página.</p>
            </div>
          )}

          {(loadingStatus === STATUS.SUCCESS || loadingStatus === STATUS.ERROR) && (
            <SharkMap
              sharks={sharks} 
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