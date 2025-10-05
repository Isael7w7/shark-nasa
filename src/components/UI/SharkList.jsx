

import React from 'react';
import './Card.css'; // Reutilizamos el CSS de tarjeta

export default function SharkList({ sharks, onSelectShark, selectedSharkId }) {
  return (
    <div className="list-container">
      <h2 className="sidebar-heading">Tiburones Activos</h2>
      {sharks.map((shark) => (
        <div
          key={shark.id}
          className={`card list-item ${shark.id === selectedSharkId ? 'selected' : ''}`}
          onClick={() => onSelectShark(shark.id)}
        >
          <div className="list-item-header">
            <h3 className="list-item-title">{shark.name} #{shark.id}</h3>
            <span className="badge">{shark.speciesName || 'Desconocido'}</span>
          </div>
          <p className="list-item-muted">
            Especie: {shark.scientificName || 'N/A'}
          </p>
          <p className="list-item-muted">
            Longitud: {shark.length ? `${shark.length.toFixed(1)}m` : 'N/A'}
          </p>
          <p className="list-item-muted">
            Peso: {shark.weight ? `${shark.weight.toFixed(0)}kg` : 'N/A'}
          </p>
          <p className="list-item-muted">
            Puntos de tracking: {shark.totalTrackingPoints || 0}
          </p>
        </div>
      ))}
    </div>
  );
}