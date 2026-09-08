

import React from 'react';

function DeleteConfirmationModal({ show, onClose, onConfirm, userName }) {
  // Si no se debe mostrar, no renderizamos nada
  if (!show) {
    return null;
  }

  return (
    // El 'modal-backdrop' es el fondo oscuro semitransparente
    <div className="modal-backdrop show">
      <div className="modal show" style={{ display: 'block' }} tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirmar Eliminación</h5>
              <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {/* Usamos el nombre del usuario para que el mensaje sea más claro */}
              <p>¿Estás seguro de que quieres eliminar al usuario <strong>{userName}</strong>?</p>
              <p className="text-danger small">Esta acción no se puede deshacer.</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancelar
              </button>
              <button type="button" className="btn btn-danger" onClick={onConfirm}>
                Confirmar Eliminación
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;