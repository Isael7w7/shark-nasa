// src/components/navigation/Sidebar.jsx (CÓDIGO COMPLETO)

import React from 'react';
import SharkStats from '../UI/ShakStats.jsx';
import SharkList from '../UI/Sharklist.jsx';
import './Sidebar.css';

export default function Sidebar({ sharks, onSelectShark, selectedSharkId }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <SharkStats sharks={sharks} />
        <SharkList
          sharks={sharks}
          onSelectShark={onSelectShark}
          selectedSharkId={selectedSharkId}
        />
      </div>
    </aside>
  );
}