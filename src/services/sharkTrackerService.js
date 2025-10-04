// src/services/sharkTrackerService.js (CÓDIGO COMPLETO CON CALLBACK DE ERROR)

import endpoints from '../config/apiConfig.js';

let intervalId = null;

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
      const response = await fetch(endpoints.sharks.getAll);
      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status}`);
      }
      const sharksData = await response.json();

      // Llamamos al callback de ÉXITO
      if (successCallback) successCallback(sharksData);

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

export const sharkService = {
  listenForSharkUpdates,
};