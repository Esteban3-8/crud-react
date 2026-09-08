

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import AlertContainer from "../components/AlertContainer";
import userService from "../services/userService";
import defaultAvatar from '../assets/images/01.jpg';

function EditUserForm() {
  const navigate = useNavigate();
  const { id } = useParams(); // En esta página, el ID siempre existirá

  // Estados
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [cedula, setCedula] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [imagen, setImagen] = useState(null);
  const [preview, setPreview] = useState(defaultAvatar);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [errors, setErrors] = useState({});

  // Funciones de ayuda
  const removeAlert = (id) => setAlerts(current => current.filter(alert => alert.id !== id));
  const addAlert = (message, type = 'error') => {
    const newAlertId = Date.now() + Math.random();
    setAlerts(current => [{ id: newAlertId, message, type }, ...current]);
    setTimeout(() => removeAlert(newAlertId), 4000);
  };
  

  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return; 
     const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      addAlert('Formato de archivo no válido.', 'error');
      e.target.value = '';

      return;
    }
  
    
    setImagen(file);
    setPreview(URL.createObjectURL(file));
  };


   const validateForm = () => {
    const newErrors = {};
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre)) newErrors.nombre = 'El nombre solo puede contener letras.';
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(apellido)) newErrors.apellido = 'El apellido solo puede contener letras.';
    if (!/^[0-9]{7,15}$/.test(cedula)) newErrors.cedula = 'La cédula debe contener solo números (7-15 dígitos).';
    if (!/^[0-9]{7,15}$/.test(telefono)) newErrors.telefono = 'El teléfono debe contener solo números (7-15 dígitos).';
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) newErrors.email = 'Ingrese un email válido.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  // Lógica para cargar los datos del usuario a editar
  useEffect(() => {
    const API_URL_BASE = 'http://localhost:5000';
    const fetchUserData = async () => {
      try {
        const response = await userService.getUserById(id);
        const userData = response.data;
        setNombre(userData.nombre);
        setApellido(userData.apellido);
        setCedula(userData.cedula);
        setEmail(userData.email);
        setTelefono(userData.telefono);
        setPreview(`${API_URL_BASE}/uploads/${userData.imagen}`);
        setImagen(userData.imagen);
      } catch (error) {
        console.error("Fallo la carga de  datos para edicion", error);
        
        addAlert("Error al cargar los datos del usuario.", 'error');
        navigate('/users');
      }
    };
    fetchUserData();
  }, [id, navigate]);

  // Lógica para enviar el formulario (solo para actualizar)
  const handleFormSubmit = async (e) => {
    e.preventDefault();
     if (!validateForm()) {
      addAlert('Por favor, corrija los errores del formulario.', 'error');
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('apellido', apellido);
    formData.append('cedula', cedula);
    formData.append('email', email);
    formData.append('telefono', telefono);
    if (imagen instanceof File) {
      formData.append('imagen', imagen);
    }

    try {
      await userService.updateUser(id, formData);
      addAlert('¡Usuario actualizado con éxito!', 'success');
      setTimeout(() => navigate('/users'), 1500);
    } catch (error) {
      addAlert(error.response?.data?.mensaje || 'Error al actualizar.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <AlertContainer alerts={alerts} onRemoveAlert={removeAlert} />
      <div className="container mt-5">
        <h2 className="mb-4 text-center">Editar Usuario</h2>
        <form onSubmit={handleFormSubmit} noValidate>
              <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <input type="text" className="form-control" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                {errors.nombre && <div className="error-text">{errors.nombre}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="apellido" className="form-label">Apellido</label>
                <input type="text" className="form-control" id="apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} />
                {errors.apellido && <div className="error-text">{errors.apellido}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="cedula" className="form-label">Cédula</label>
                <input type="text" className="form-control" id="cedula" value={cedula} onChange={(e) => setCedula(e.target.value)} />
                {errors.cedula && <div className="error-text">{errors.cedula}</div>}
              </div>
            </div>

            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Correo</label>
                <div className="input-group">
                  <span className="input-group-text">@</span>
                  <input type="email" className="form-control" id="email" placeholder="nombre.usuario" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                {errors.email && <div className="error-text">{errors.email}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="telefono" className="form-label">Teléfono</label>
                <input type="tel" className="form-control" id="telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                {errors.telefono && <div className="error-text">{errors.telefono}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">Imagen de Perfil</label>
                <div className="file-upload-container">
                  <input type="file" id="imagen" className="hidden-file-input" accept="image/*" onChange={handleImageChange} />
                  <label htmlFor="imagen" className="custom-file-label">
                     Haga clic aquí para seleccionar una imagen
                  </label>
                  <div className={`image-preview-wrapper ${!imagen ? 'is-default' : ''}`}>
                    <img src={preview} alt="Vista previa" className="image-preview" />
                  </div>
                  {errors.imagen && <div className="error-text text-center">{errors.imagen}</div>}
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-4">
            <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

// No olvides copiar las funciones handleImageChange y validateForm completas aquí
// ...

export default EditUserForm;