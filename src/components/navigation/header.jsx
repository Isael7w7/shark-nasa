// src/components/navigation/header.jsx
import React from 'react';
import './header.css';
import waveIcon from '../../../public/logo.png'; 
import locationIcon from '../../assets/gps.png'; 

export default function Header() {
  return (
    <header className="app-header">
      <div className="header-left">
        <div className="logo-container">
          {/* 1. Clase única para la imagen del logo: logo-image */}
          <img 
               src={waveIcon} 
               alt="Icono de una ola" 
               className="logo-image" 
           />
        </div>
        <div>
          <h1 className="header-title">Shark Tracker</h1>
          <p className="header-subtitle">Monitoreo en tiempo real</p>
        </div>
      </div>

      <div className="header-right">
        <input type="text" placeholder="Buscar ubicación..." className="search-input" />
        
        <button className="icon-button">
          {/* 2. Clase única para la imagen del botón: location-image */}
          <img 
            src={locationIcon} 
            alt="Icono de ubicación" 
            className="location-image" // ¡Clase cambiada a 'location-image'!
          />
        </button>
      </div>
    </header>
  );
}