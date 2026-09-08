

import React from 'react';
import CustomAlert from './CustomAlert';

const alertContainerStyles = {
  position: 'fixed', // <-- SÓLO ESTE COMPONENTE TIENE POSITION: FIXED
  top: '20px',
  right: '20px',
  zIndex: 1000,
  display: 'flex',
  flexDirection: 'column', // <-- El orden normal, de arriba hacia abajo.
  gap: '10px',
};

function AlertContainer({ alerts, onRemoveAlert }) {
  return (
    <div style={alertContainerStyles}>
      {alerts.map((alert) => (
        <CustomAlert
          key={alert.id}
          id={alert.id}
          message={alert.message}
          type={alert.type}
          onClose={() => onRemoveAlert(alert.id)}
        />
      ))}
    </div>
  );
}

export default AlertContainer;