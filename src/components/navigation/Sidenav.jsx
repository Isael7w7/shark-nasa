// src/components/navigation/Sidenav.jsx

import React from 'react';
import './Sidenav.css';
//logo png 
// import { ReactComponent as SharkLogo } from '../../assets/shark-logo.svg';

const Sidenav = () => {
  return (
    <nav className="sidenav">
      <div className="sidenav-header">
        <h1>Shark Traker</h1>
      </div>
      <ul className="sidenav-links">
        <li><a href="#" className="active">Dashboard de Rastreo</a></li>
        <li><a href="#">Lista de Tiburones</a></li>
        <li><a href="#">Análisis de Hábitat</a></li>
        <li><a href="#">Configuración</a></li>
      </ul>
    </nav>
  );
};

export default Sidenav;