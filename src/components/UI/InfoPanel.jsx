// src/components/UI/InfoPanel.jsx (VERSIÓN FINAL Y COMPLETA)

import React, { useState } from 'react';
import './InfoPanel.css';

const InfoPanel = ({ sharkInfo }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // 1. LÓGICA DE COLAPSO (que faltaba)
  const togglePanel = () => {
    setIsCollapsed(!isCollapsed);
  };

  // 2. MANEJO DEL ESTADO DE CARGA (que faltaba)
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

  // 3. JSX COMPLETO (que faltaba)
  // Incluye la cabecera clickeable y el contenido dinámico.
  return (
    <div className={`info-panel ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="panel-header" onClick={togglePanel}>
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