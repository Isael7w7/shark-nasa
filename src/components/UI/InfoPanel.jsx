// src/components/UI/InfoPanel.jsx

import React, { useState } from 'react';
import './InfoPanel.css';

// PASO 1: Importa la imagen aquí
import gpsIcon from '../../assets/gps.png';

const InfoPanel = ({ sharkInfo }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const togglePanel = () => {
    setIsCollapsed(!isCollapsed);
  };

  // 2. MANEJO DEL ESTADO DE CARGA 
  // Si no hay datos, mostramos un panel de carga y detenemos la ejecución aquí.
  if (!sharkInfo) {
    return (
      <div className="info-panel">
        <div className="panel-header">
          <h2>ESPERANDO DATOS...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className={`info-panel ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="panel-header" onClick={togglePanel}>

        {/* PASO 2: Usa la variable importada aquí */}
        <img src={gpsIcon} alt="rastreo" />

        <h2>RASTREO ACTIVO</h2>
        <div className="toggle-indicator">
          {isCollapsed ? '+' : '−'}
        </div>
      </div>

      <div className="panel-content">
        <h3>{sharkInfo.name}</h3>
        <ul>
          <li><strong>ID de Rastreo:</strong> {sharkInfo.id}</li>
          <li><strong>Profundidad:</strong> -{sharkInfo.depth}m</li>
          <li><strong>Velocidad:</strong> {sharkInfo.speed.toFixed(1)} nudos</li>
          <li><strong>Estado:</strong> {sharkInfo.state}</li>
        </ul>
      </div>
    </div>
  );
};

export default InfoPanel;