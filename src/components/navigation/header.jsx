
import React from 'react';
import './header.css';

export default function Header() {
  return (
    <header className="app-header">
      <div className="header-left">
        <div className="logo-container">
          {/* Usamos un emoji como placeholder del icono Waves */}
          <span role="img" aria-label="wave">🌊</span>
        </div>
        <div>
          <h1 className="header-title">Shark Tracker</h1>
          <p className="header-subtitle">Monitoreo en tiempo real</p>
        </div>
      </div>

      <div className="header-right">
        {/* Placeholder para la búsqueda y botones */}
        <input type="text" placeholder="Buscar ubicación..." className="search-input" />
        <button className="icon-button">📍</button>
      </div>
    </header>
  );
}