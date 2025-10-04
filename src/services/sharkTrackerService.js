// src/services/sharkTrackerService.js (VERSIÓN MULTI-TIBURÓN)

// El estado ahora es un array de objetos
let sharksData = [
  { id: '73-ALPHA', name: 'Tiburón Duende', position: [26.5, -85.0], depth: 120, speed: 1.5, state: 'Forrajeando' },
  { id: '42-BRAVO', name: 'Tiburón Tigre', position: [27.0, -84.5], depth: 25, speed: 3.0, state: 'Navegando' },
  { id: '99-CHARLIE', name: 'Tiburón Martillo', position: [26.0, -84.0], depth: 50, speed: 2.2, state: 'Navegando' },
];

let intervalId = null;

function listenForSharkUpdates(callback) {
  if (intervalId) return;
  console.log("Servicio: Iniciando simulación de MÚLTIPLES tiburones...");

  callback(sharksData);

  intervalId = setInterval(() => {
    // Iteramos sobre cada tiburón y actualizamos sus datos individualmente
    sharksData = sharksData.map(shark => {
      const newPosition = [
        shark.position[0] + (Math.random() - 0.5) * 0.05,
        shark.position[1] + (Math.random() - 0.5) * 0.05,
      ];
      const newSpeed = shark.speed + (Math.random() - 0.5) * 0.2;

      return {
        ...shark,
        position: newPosition,
        speed: Math.max(0, newSpeed),
      };
    });

    callback(sharksData); // Enviamos el array completo y actualizado
  }, 2000);

  return () => {
    console.log("Servicio: Deteniendo simulación de datos.");
    clearInterval(intervalId);
    intervalId = null;
  };
}

export const sharkService = {
  listenForSharkUpdates,
};