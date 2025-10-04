// src/layouts/MainLayout.jsx

import React from 'react';
import Sidenav from "../components/navigation/Sidenav.jsx";
import './MainLayout.css';

// Este componente recibe como 'children' la página que debe mostrar.
const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <Sidenav />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;