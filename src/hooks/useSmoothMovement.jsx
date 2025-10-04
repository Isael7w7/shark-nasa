// src/hooks/useSmoothMovement.jsx (VERSIÓN ROBUSTA Y CORREGIDA)

import { useState, useEffect, useRef } from 'react';

export const useSmoothMovement = (targetPosition) => {
  // --- CLÁUSULA DE GUARDA ---
  // Si por alguna razón la posición objetivo no está definida,
  // no hacemos nada y devolvemos null para evitar un crash.
  if (!targetPosition || !Array.isArray(targetPosition) || targetPosition.length !== 2) {
    console.error("useSmoothMovement: Se recibió una targetPosition inválida:", targetPosition);
    return null; // Devolvemos null para que el componente que lo usa sepa que no hay posición.
  }

  const [currentPosition, setCurrentPosition] = useState(targetPosition);
  const animationRef = useRef();

  useEffect(() => {
    // Otra guarda por si acaso, aunque la principal ya debería haber actuado.
    if (!targetPosition) return;

    clearInterval(animationRef.current);

    const animationInterval = 16;
    const totalDuration = 1000;
    const totalSteps = totalDuration / animationInterval;
    let currentStep = 0;

    const [startLat, startLng] = currentPosition;
    const [targetLat, targetLng] = targetPosition;

    // Comprobación final para evitar errores si los datos son incorrectos.
    if (typeof startLat !== 'number' || typeof targetLat !== 'number') return;

    animationRef.current = setInterval(() => {
      currentStep++;
      const progress = currentStep / totalSteps;
      const newLat = startLat + (targetLat - startLat) * progress;
      const newLng = startLng + (targetLng - startLng) * progress;

      setCurrentPosition([newLat, newLng]);

      if (currentStep >= totalSteps) {
        clearInterval(animationRef.current);
        setCurrentPosition(targetPosition);
      }
    }, animationInterval);

    return () => clearInterval(animationRef.current);

  }, [targetPosition]); // La dependencia sigue siendo la misma.

  return currentPosition;
};