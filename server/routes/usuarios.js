const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// --- 1. IMPORTA TUS CONTROLADORES AQUÍ, AL PRINCIPIO ---
const { 
  agregarUsuario, 
  obtenerTodosLosUsuarios,
  actualizarUsuario,
  obtenerUsuarioPorId,
  eliminarUsuario
} = require('../controllers/usuarioControllers');

// --- 2. CONFIGURACIÓN DE MULTER ---
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Formato de archivo no válido. Solo se permiten imágenes.'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { 
    fileSize: 20 * 1024 * 1024, // 5MB
  }
});

// --- 3. DEFINICIÓN DE RUTAS ---
// Ahora todas estas funciones son conocidas y se pueden usar sin error.

// [POST] /api/usuarios/agregarusuario
router.post('/agregarusuario', upload.single('imagen'), agregarUsuario);

// [GET] /api/usuarios/obtenerusuarios
router.get('/obtenerusuarios', obtenerTodosLosUsuarios);

// [PUT] /api/usuarios/actualizar/:id
router.put('/actualizar/:id', upload.single('imagen'), actualizarUsuario);

// [DELETE] /api/usuarios/eliminar/:id
// Nota: 'upload' no es necesario para eliminar, ya que no se sube ningún archivo.
router.delete('/eliminar/:id', eliminarUsuario);

// [GET] /api/usuarios/:id (Esta ruta debe ir al final si tienes otras más específicas como /obtenerusuarios)
router.get('/:id', obtenerUsuarioPorId);

module.exports = router;