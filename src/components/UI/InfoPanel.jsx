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
          <li><strong>ID:</strong> {sharkInfo.id}</li>
          <li><strong>Tag ID:</strong> {sharkInfo.tagId || 'N/A'}</li>
          <li><strong>Especie:</strong> {sharkInfo.speciesName || 'N/A'}</li>
          <li><strong>Nombre científico:</strong> {sharkInfo.scientificName || 'N/A'}</li>
          <li><strong>Género:</strong> {sharkInfo.gender || 'N/A'}</li>
          <li><strong>Longitud:</strong> {sharkInfo.length ? `${sharkInfo.length.toFixed(1)}m` : 'N/A'}</li>
          <li><strong>Peso:</strong> {sharkInfo.weight ? `${sharkInfo.weight.toFixed(0)}kg` : 'N/A'}</li>
          <li><strong>Fecha de marcado:</strong> {sharkInfo.taggedDate ? new Date(sharkInfo.taggedDate).toLocaleDateString('es-ES') : 'N/A'}</li>
          <li><strong>Ubicación de marcado:</strong> {sharkInfo.taggedLocation || 'N/A'}</li>
          <li><strong>Puntos de tracking:</strong> {sharkInfo.totalTrackingPoints || 0}</li>
        </ul>
        {sharkInfo.notes && (
          <div className="notes-section">
            <strong>Notas:</strong>
            <p>{sharkInfo.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoPanel;