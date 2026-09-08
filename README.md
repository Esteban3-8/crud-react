# CRUD de Usuarios

Sistema de gestión de usuarios (CRUD completo) desarrollado con **React** en el frontend y **Node.js / Express / MongoDB** en el backend. Permite crear, listar, editar y eliminar usuarios, incluyendo la carga de una imagen de perfil para cada uno.

## Características

- ✅ Crear usuarios con nombre, apellido, cédula, email, teléfono e imagen de perfil.
- ✅ Listar usuarios con paginación (3 por página).
- ✅ Ver detalles adicionales de cada usuario (ID, fecha de registro, última actualización).
- ✅ Editar usuarios existentes, incluyendo reemplazo de la imagen de perfil.
- ✅ Eliminar usuarios con modal de confirmación.
- ✅ Validaciones de formulario en frontend (nombre/apellido solo letras, cédula y teléfono solo números, email válido) y en backend (esquema de Mongoose).
- ✅ Manejo de imágenes con `multer` (subida) y borrado automático de la imagen anterior al actualizar o eliminar un usuario.
- ✅ Sistema de alertas personalizadas (éxito / error) con auto-cierre.
- ✅ Manejo centralizado de errores en el backend (tamaño de archivo, formato inválido, duplicados de cédula/email, errores de validación).

## Tecnologías

**Frontend**
- React (con React Router DOM)
- Axios
- Bootstrap 5

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- Multer (subida de archivos)
- CORS
- dotenv

## Estructura del proyecto

```
proyecto/
├── backend/
│   ├── controllers/
│   │   └── usuarioControllers.js
│   ├── models/
│   │   └── Usuarios.js
│   ├── routes/
│   │   └── usuarios.js
│   ├── uploads/            # Imágenes subidas (se crea automáticamente)
│   ├── app.js
│   └── .env                # Variables de entorno (no incluido)
│
└── frontend/
    └── src/
        ├── assets/images/
        │   ├── 01.jpg           # Avatar por defecto
        │   └── default.jpg      # Placeholder "No Imagen"
        ├── components/
        │   ├── Header.jsx / Header.css
        │   ├── AlertContainer.jsx
        │   ├── CustomAlert.jsx / CustomAlert.css
        │   └── DeleteConfirmationModal.jsx
        ├── pages/
        │   ├── Home.jsx
        │   ├── Users.jsx
        │   ├── UserForm.jsx
        │   └── EditUserForm.jsx
        ├── services/
        │   └── userService.js
        ├── App.jsx / App.css
        └── main.jsx
```

## Instalación

### Requisitos previos
- Node.js instalado
- MongoDB (local o Atlas)

### Backend

```bash
cd backend
npm install
```

Crea un archivo `.env` en la carpeta `backend` con las siguientes variables:

```env
MONGO_URI=mongodb://localhost:27017/nombre_de_tu_bd
PORT=5000
```

Inicia el servidor:

```bash
node app.js
```

El servidor quedará corriendo en `http://localhost:5000`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

La aplicación quedará disponible en `http://localhost:5173` (o el puerto que indique Vite).

## Endpoints de la API

Base URL: `http://localhost:5000/api/usuarios`

| Método | Endpoint                | Descripción                          |
|--------|--------------------------|---------------------------------------|
| GET    | `/obtenerusuarios`      | Obtiene todos los usuarios            |
| GET    | `/:id`                  | Obtiene un usuario por su ID          |
| POST   | `/agregarusuario`       | Crea un nuevo usuario (con imagen)    |
| PUT    | `/actualizar/:id`       | Actualiza un usuario existente        |
| DELETE | `/eliminar/:id`         | Elimina un usuario                    |

Las imágenes subidas se sirven de forma estática desde `http://localhost:5000/uploads/<nombre_archivo>`.

## Rutas del Frontend

| Ruta            | Página                          |
|------------------|----------------------------------|
| `/`              | Inicio                          |
| `/users`         | Lista de usuarios                |
| `/form`          | Formulario de creación de usuario|
| `/edit/:id`      | Formulario de edición de usuario |

## Modelo de datos (Usuario)

| Campo      | Tipo   | Reglas                                              |
|------------|--------|------------------------------------------------------|
| nombre     | String | Obligatorio, solo letras y espacios                  |
| apellido   | String | Obligatorio, solo letras y espacios                  |
| cedula     | String | Obligatorio, único, solo números (7-15 dígitos)      |
| email      | String | Obligatorio, único, formato de email válido          |
| telefono   | String | Obligatorio, solo números (7-15 dígitos)             |
| imagen     | String | Obligatorio, nombre del archivo subido               |

