

import { useState, useEffect } from "react";
import userService from '../services/userService';
import { Link } from "react-router-dom";
import Header from "../components/Header";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import AlertContainer from "../components/AlertContainer";
import noImagePlaceholder from '../assets/images/default.jpg';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(3);
  const [userToDelete, setUserToDelete] = useState(null);
  const [alerts, setAlerts] = useState([]);
  
  const [expandedUser, setExpandedUser] = useState(null);

  const API_URL = 'http://localhost:5000';

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userService.getAllUsers();
        setUsers(response.data);
      } catch (err) {
        setError("No se pudieron cargar los usuarios");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleToggleExpand = (userId) => {
    
   setExpandedUser(prevId => (prevId === userId ? null : userId));
  };

  const removeAlert = (id) => {
    setAlerts(currentAlerts => currentAlerts.filter(alert => alert.id !== id));
  };

  const addAlert = (message, type = 'success') => {
    const newAlertId = Date.now() + Math.random();
    setAlerts(currentAlerts => [{ id: newAlertId, message, type }, ...currentAlerts]);
    setTimeout(() => removeAlert(newAlertId), 4000);
  };
  
  const openDeleteModal = (user) => setUserToDelete(user);
  const closeDeleteModal = () => setUserToDelete(null);

  const confirmDelete = async () => {
    if (!userToDelete) return;

    try {
      await userService.deleteUser(userToDelete._id);
      setUsers(currentUsers => currentUsers.filter(user => user._id !== userToDelete._id));
      addAlert('Usuario eliminado con éxito', 'success');
    } catch (err) {
      console.error("Error al eliminar el usuario", err);
      addAlert('No se pudo eliminar el usuario.', 'error');
    } finally {
      closeDeleteModal();
    }
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);
  const paginate = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger text-center mt-5">{error}</div>;
  }

  return (
    <>
      <Header />
      <AlertContainer alerts={alerts} onRemoveAlert={removeAlert} />
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center">
            <h2 className="mb-0 me-3">Lista de Usuarios</h2>
            <span className="badge bg-primary rounded-pill fs-6">
              {users.length} Total
            </span>
          </div>
          <Link to="/form" className="btn btn-primary">+ Crear Nuevo Usuario</Link>
        </div>

        {users.length === 0 ? (
          <p className="text-center">No hay usuarios registrados.</p>
        ) : (
          <>
            {currentUsers.map((user) => (
              <div key={user._id} className="card mb-3 shadow-sm">
                <div className="row g-0 align-items-center">
                  <div className="col-md-2 text-center p-3">
                    <img
                      src={`${API_URL}/uploads/${user.imagen}`}
                      onError={(e) => { e.target.onerror = null; e.target.src = noImagePlaceholder; }}
                      alt={`${user.nombre} ${user.apellido}`}
                      className="img-fluid rounded"
                      style={{ width: "150px", height: "150px", objectFit: "cover" }}
                    />
                  </div>
                  <div className="col-md-7">
                    <div className="card-body">
                      <h5 className="card-title"><strong>{user.nombre} {user.apellido}</strong></h5>
                      <p className="mb-0"><strong>Cédula:</strong> {user.cedula}</p>
                      <p className="mb-0"><strong>Email:</strong> {user.email}</p>
                      <p><strong>Teléfono:</strong> {user.telefono}</p>
                    </div>


                    {expandedUser === user._id && (
                      <div className="mt-3 border-top pt-3 bg-light p-2 rounded">
                        <p className="small text-muted mb-1">
                          <strong>ID de Usuario:</strong><span className="font-monospace">{user._id}</span>
                          </p>
                        <p className="small text-muted mb-1">
                          <strong>Registrado:</strong>{new Date(user.createdAt).toLocaleDateString()}
                        </p>
                        <p className="small text-muted mb-0">
                          <strong>Ultima Actualizacion:</strong>{new Date(user.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="col-md-3 text-center">
                    <div className="d-grid gap-2 p-3">
                      <button onClick={() => handleToggleExpand(user._id)} className="btn btn-outline-primary btn-sm">
                        {expandedUser === user._id ? 'Ocultar Detalles' : 'Ver Detalles'}</button>

                      <Link to={`/edit/${user._id}`} className="btn btn-outline-success btn-sm">Editar</Link>
                      <button 
                        onClick={() => openDeleteModal(user)}
                        className="btn btn-outline-danger btn-sm"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Paginación */}
            {totalPages > 1 && (
              <nav className="d-flex justify-content-center mt-4">
                <ul className="pagination">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <a onClick={() => paginate(currentPage - 1)} href="#!" className="page-link">«</a>
                  </li>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                      <a onClick={() => paginate(i + 1)} href="#!" className="page-link">{i + 1}</a>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <a onClick={() => paginate(currentPage + 1)} href="#!" className="page-link">»</a>
                  </li>
                </ul>
              </nav>
            )}
          </>
        )}
      </div>

      <DeleteConfirmationModal
        show={!!userToDelete}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        userName={userToDelete?.nombre}
      />
    </>
  );
}

export default Users;