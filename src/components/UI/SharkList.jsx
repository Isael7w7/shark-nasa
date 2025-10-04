

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
            <h3 className="list-item-title">{shark.name} #{shark.id.split('-')[1]}</h3>
            <span className="badge">{shark.state}</span>
          </div>
          <p className="list-item-muted">Velocidad: {shark.speed.toFixed(1)} nudos</p>
          <p className="list-item-muted">Profundidad: -{shark.depth}m</p>
        </div>
      ))}
    </div>
  );
}