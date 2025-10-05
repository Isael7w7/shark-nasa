// src/services/sharkTrackerService.js (ADAPTADO AL API REAL)

import endpoints from '../config/apiConfig.js';

let intervalId = null;

/**
 * Obtiene la última posición de tracking de un tiburón
 * @param {number} sharkId - ID del tiburón
 * @returns {Promise<Object|null>} Última posición o null
 */
async function getLastPosition(sharkId) {
  try {
    const response = await fetch(endpoints.tracking.getBySharkId(sharkId), {
      headers: {
        'ngrok-skip-browser-warning': 'true'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Error al obtener tracking: ${response.status}`);
    }
    
    const trackingData = await response.json();
    
    // Si hay datos de tracking, devolvemos el último (más reciente)
    if (trackingData && trackingData.length > 0) {
      // Ordenamos por fecha descendente y tomamos el primero
      const sorted = trackingData.sort((a, b) => 
        new Date(b.trackingDateTime) - new Date(a.trackingDateTime)
      );
      return {
        latitude: sorted[0].latitude,
        longitude: sorted[0].longitude
      };
    }
    
    return null;
  } catch (error) {
    console.error(`Error obteniendo posición del tiburón ${sharkId}:`, error);
    return null;
  }
}

/**
 * @param {function(Array<any>): void} successCallback El callback para cuando los datos llegan bien.
 * @param {function(Error): void} errorCallback El callback para cuando ocurre un error.
 * @returns {function(): void} Una función para detener el polling.
 */
function listenForSharkUpdates(successCallback, errorCallback) {
  if (intervalId) return;
  console.log("Servicio: Iniciando polling al backend...");

  const fetchSharkData = async () => {
    try {
      const response = await fetch(endpoints.sharks.getAll, {
        headers: {
          'ngrok-skip-browser-warning': 'true'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status}`);
      }
      
      const sharksData = await response.json();
      
      // Para cada tiburón, obtener su última posición
      const sharksWithPositions = await Promise.all(
        sharksData.map(async (shark) => {
          const position = await getLastPosition(shark.id);
          
          // Transformamos los datos del API al formato que espera el frontend
          return {
            id: shark.id,
            name: shark.name,
            tagId: shark.tagId,
            gender: shark.gender,
            length: shark.length,
            weight: shark.weight,
            taggedDate: shark.taggedDate,
            taggedLocation: shark.taggedLocation,
            notes: shark.notes,
            speciesName: shark.speciesName,
            scientificName: shark.scientificName,
            totalTrackingPoints: shark.totalTrackingPoints,
            // Posición para el mapa (array [lat, lng])
            position: position ? [position.latitude, position.longitude] : null
          };
        })
      );

      // Filtramos tiburones sin posición (por si acaso)
      const validSharks = sharksWithPositions.filter(s => s.position !== null);

      // Llamamos al callback de ÉXITO
      if (successCallback) successCallback(validSharks);

    } catch (error) {
      console.error("Servicio: Falló la obtención de datos.", error);

      // Llamamos al callback de ERROR
      if (errorCallback) errorCallback(error);
    }
  };

  fetchSharkData();
  intervalId = setInterval(fetchSharkData, 5000);

  return () => {
    console.log("Servicio: Deteniendo polling.");
    clearInterval(intervalId);
    intervalId = null;
  };
}

/**
 * Obtiene las predicciones de movimiento de un tiburón específico
 * @param {number} sharkId - ID del tiburón
 * @param {number} iterations - Número de iteraciones para la predicción
 * @returns {Promise<Object>} Datos de predicción con tracking histórico ordenado
 */
async function getPredictions(sharkId, iterations = 20) {
  try {
    // Primero obtenemos el historial de tracking completo
    const trackingResponse = await fetch(endpoints.tracking.getBySharkId(sharkId), {
      headers: {
        'ngrok-skip-browser-warning': 'true'
      }
    });
    
    if (!trackingResponse.ok) {
      throw new Error(`Error al obtener tracking: ${trackingResponse.status}`);
    }
    
    const trackingData = await trackingResponse.json();
    
    // Ahora obtenemos las predicciones
    const predictionResponse = await fetch(endpoints.tracking.predict(sharkId, iterations), {
      headers: {
        'ngrok-skip-browser-warning': 'true'
      }
    });
    
    if (!predictionResponse.ok) {
      throw new Error(`Error al obtener predicciones: ${predictionResponse.status}`);
    }
    
    const predictionData = await predictionResponse.json();
    
    // Ordenamos el tracking histórico por fecha (más antiguo a más reciente)
    const sortedTracking = trackingData.sort((a, b) => 
      new Date(a.trackingDateTime) - new Date(b.trackingDateTime)
    );
    
    console.log("Tracking completo ordenado por fecha:", sortedTracking.map(t => ({
      lat: t.latitude,
      lng: t.longitude,
      date: t.trackingDateTime
    })));
    
    // Tomamos las últimas 5 posiciones como historial
    const last5Positions = sortedTracking.slice(-5);
    
    console.log("Últimas 5 posiciones:", last5Positions.map(t => ({
      lat: t.latitude,
      lng: t.longitude,
      date: t.trackingDateTime
    })));
    
    // Convertimos el tracking a formato de posiciones
    const historicalPositions = last5Positions.map(track => ({
      latitude: track.latitude,
      longitude: track.longitude,
      trackingDateTime: track.trackingDateTime
    }));
    
    // Combinamos todo
    const result = {
      sharkId: predictionData.sharkId,
      sharkName: predictionData.sharkName,
      predictedPositions: predictionData.predictedPositions,
      usedPositions: historicalPositions, // Ahora están ordenadas cronológicamente
      currentPosition: historicalPositions[historicalPositions.length - 1] // La última es la actual
    };
    
    console.log("Predicciones obtenidas con historial ordenado:", result);
    return result;
  } catch (error) {
    console.error("Error obteniendo predicciones:", error);
    throw error;
  }
}

export const sharkService = {
  listenForSharkUpdates,
  getPredictions,
};