

import React, { useEffect } from 'react';
import './CustomAlert.css';

// Iconos (se mantienen igual)
const IconError = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="alert-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const IconSuccess = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="alert-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// El componente ahora recibe el ID y no necesita saber si está visible o no
function CustomAlert({ id, message, type, onClose }) {
  const icon = type === 'success' ? <IconSuccess /> : <IconError />;

  return (
    <div className={`custom-alert alert-${type}`}>
      <div className="alert-content">
        {icon}
        <span className="alert-message">{message}</span>
      </div>
      <button className="close-btn" onClick={onClose}>
        ×
      </button>
    </div>
  );
}

export default CustomAlert;