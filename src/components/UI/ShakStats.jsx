import React from 'react';
import './Card.css'; // 

export default function SharkStats({ sharks }) {
  // Obtenemos especies únicas
  const uniqueSpecies = new Set(sharks.map(s => s.speciesName).filter(Boolean));

  // Calculamos el total de puntos de tracking
  const totalTrackingPoints = sharks.reduce((sum, shark) => sum + (shark.totalTrackingPoints || 0), 0);

  const stats = [
    { label: "Tiburones rastreados", value: sharks.length, change: "Activos" },
    { label: "Especies diferentes", value: uniqueSpecies.size, change: "" },
    { label: "Puntos de tracking", value: totalTrackingPoints, change: "" },
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