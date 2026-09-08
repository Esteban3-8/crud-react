
import axios from 'axios';


// Si alguna vez cambia, solo la modificas aquí.
const API_URL = 'http://localhost:5000/api/usuarios';

// Función para obtener todos los usuarios
const getAllUsers = () => {
  return axios.get(`${API_URL}/obtenerusuarios`);
};

// Función para crear un nuevo usuario
// Recibe el objeto FormData que creas en tu formulario.
const createUser = (formData) => {
  return axios.post(`${API_URL}/agregarusuario`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

// Función para eliminar un usuario por su ID
const deleteUser = (id) => {
  return axios.delete(`${API_URL}/eliminar/${id}`);
};

// Función para actualizar un usuario
// Recibe el ID y el FormData con los nuevos datos.
const updateUser = (id, formData) => {
  return axios.put(`${API_URL}/actualizar/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

const getUserById = (id) => {
   return axios.get(`${API_URL}/${id}`);
};


// Exportamos todas las funciones para que puedan ser usadas en los componentes
const userService = {
  getAllUsers,
  createUser,
  deleteUser,
  getUserById,
  updateUser
};

export default userService;