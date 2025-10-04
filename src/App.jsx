// src/App.jsx

import React, { useState, useEffect } from 'react';
import MainLayout from './layouts/MainLayout';
import TrackerPage from './pages/TrackerPage';
import SplashScreen from './components/UI/SplashScreen'; // Asegúrate de que la ruta sea correcta

function App() {
  // Estado para controlar si se muestra o no el SplashScreen
  const [showSplash, setShowSplash] = useState(true);
  // Estado para controlar el inicio del desvanecimiento
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Inicia el desvanecimiento después de 2 segundos
    const fadeTimeout = setTimeout(() => {
      setIsFading(true);
    }, 2000);

    // Oculta completamente el splash screen después de que termine la animación (2s + 0.5s)
    const hideTimeout = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

    // Limpieza al desmontar el componente
    return () => {
      clearTimeout(fadeTimeout);
      clearTimeout(hideTimeout);
    };
  }, []); // El array vacío asegura que se ejecute solo una vez

  return (
    <>
      {/* El SplashScreen se muestra condicionalmente por encima de todo */}
      {showSplash && <SplashScreen isFading={isFading} />}

      {/* Tu aplicación principal sigue igual */}
      <MainLayout>
        <TrackerPage />
      </MainLayout>
    </>
  );
}

export default App;