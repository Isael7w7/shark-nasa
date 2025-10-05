// src/App.jsx (CÓDIGO MODIFICADO)

import React, { useState, useEffect } from 'react';
import SharkMapLayout from './layouts/SharkMapLayout.jsx';
import SplashScreen from './components/UI/SplashScreen.jsx';

// Duración total de la Splash Screen antes de que desaparezca completamente
const SPLASH_TOTAL_DURATION = 3000; // 3 segundos antes de que desaparezca
// Duración de la animación de desvanecido (debe coincidir con el CSS)
const FADE_OUT_DURATION = 800; // 0.8 segundos para el desvanecido

function App() {
  const [showSplash, setShowSplash] = useState(true); // Controla si la Splash está visible
  const [isFadingOut, setIsFadingOut] = useState(false); // Controla si la animación de fade-out está activa

  useEffect(() => {
    // 1. Inicia el temporizador para iniciar el desvanecido
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true); // Activa la clase de desvanecido
    }, SPLASH_TOTAL_DURATION - FADE_OUT_DURATION); // Empieza a desvanecer antes de la duración total

    // 2. Inicia el temporizador para desmontar el componente *después* de que el desvanecido termine
    const hideTimer = setTimeout(() => {
      setShowSplash(false); // Desmonta el componente Splash
    }, SPLASH_TOTAL_DURATION);

    // 3. Función de limpieza
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []); // Se ejecuta solo una vez al montar

  // Renderiza la Splash Screen si showSplash es true
  // Y le pasamos la clase isFadingOut para activar la animación
  if (showSplash) {
    return <SplashScreen isFadingOut={isFadingOut} />;
  }

  // Muestra el contenido principal una vez que showSplash es false
  return (
    <SharkMapLayout />
  );
}

export default App;