// src/App.jsx (MODIFICADO)

import React from 'react';
import MainLayout from './layouts/MainLayout';
import TrackerPage from './pages/TrackerPage';

function App() {
  return (
    <MainLayout>
      <TrackerPage />
    </MainLayout>
  );
}

export default App;