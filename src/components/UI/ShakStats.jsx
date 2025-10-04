

import React from 'react';
import './Card.css'; // 

export default function SharkStats({ sharks }) {
  const stats = [
    { label: "Tiburones rastreados", value: sharks.length, change: "Activos" },
    { label: "Navegando", value: sharks.filter(s => s.state === 'Navegando').length, change: "" },
    { label: "Forrajeando", value: sharks.filter(s => s.state === 'Forrajeando').length, change: "" },
  ];

  return (
    <div className="stats-container">
      <h2 className="sidebar-heading">Estadísticas</h2>
      {stats.map((stat) => (
        <div key={stat.label} className="card">
          <div className="stat-content">
            <div>
              <p className="stat-value">{stat.value}</p>
              <p className="stat-label">{stat.label}</p>
            </div>
            <div className="stat-change">{stat.change}</div>
          </div>
        </div>
      ))}
    </div>
  );
}