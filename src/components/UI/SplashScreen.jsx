// src/components/UI/SplashScreen.jsx

import React from 'react';
import './SplashScreen.css';

// Asegúrate de que la ruta a tu logo sea correcta
import logo from '../../../public//logo.png'; // Usando la imagen que subiste

const SplashScreen = ({ isFading }) => {
  // Añadimos la clase 'fading-out' cuando la prop isFading sea true
  const splashClassName = `splash-screen ${isFading ? 'fading-out' : ''}`;

  return (
    <div className={splashClassName}>
      <img src={logo} alt="Shark Tracker Logo" className="splash-logo" />
    </div>
  );
};

export default SplashScreen;