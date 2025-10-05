// src/components/UI/SplashScreen.jsx (ORDEN CORREGIDO)

import React from 'react';
import './SplashScreen.css';
import logo from '../../../public//logo.png'; 

const SplashScreen = ({ isFadingOut }) => { 
  const splashClassName = `splash-screen ${isFadingOut ? 'fading-out' : ''}`;

  return (
    <div className={splashClassName}>
      
      {/* 1. TÍTULO: Sale primero (arriba) */}
      <h1 className="splash-title">Shark Tracker</h1> 
      
      {/* 2. LOGO: Sale segundo (centro) */}
      <img src={logo} alt="Shark Tracker Logo" className="splash-logo" />
      
      {/* 3. TEXTO DE BIENVENIDA: Sale tercero (abajo) */}
      <p className="splash-welcome-text">Bienvenidos</p>
      
    </div>
  );
};

export default SplashScreen;