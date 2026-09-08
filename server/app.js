



const express = require('express');
// 'express': Es el marco (framework) principal de Node.js. Piensa en él como el "chef" que orquesta todo. Facilita la creación de servidores y la gestión de rutas (URLs).

const mongoose = require('mongoose');
// 'mongoose': Es una librería que nos ayuda a hablar con la base de datos MongoDB de una forma más fácil y estructurada. Es el "traductor" entre nuestro código JavaScript y la base de datos.

const cors = require('cors');
// 'cors' (Cross-Origin Resource Sharing): Es un "guardia de seguridad". Por defecto, un navegador no permite que una página en un dominio (ej. localhost:3000) pida datos a un servidor en otro dominio (ej. localhost:5000). CORS le da permiso para que puedan comunicarse.

const path = require('path');
// 'path': Es una herramienta interna de Node.js para trabajar con rutas de archivos y carpetas de una manera que funcione en cualquier sistema operativo (Windows, Mac, Linux).

require('dotenv').config();
// 'dotenv': Carga las variables (como la URL de la base de datos y el puerto) desde un archivo `.env` a `process.env`. Esto mantiene tus secretos (contraseñas, etc.) fuera del código fuente.

// --- 2. Creación de la Aplicación ---

const app = express();
// Aquí creamos nuestra aplicación. `app` es ahora el objeto principal que representa nuestro servidor. Es como crear una "cocina" vacía.

// --- 3. Configuración de "Accesorios" (Middlewares) ---
// Los middlewares son funciones que se ejecutan en cada petición que llega, antes de que llegue a la lógica de la ruta final.

// Configuración de CORS para permitir peticiones desde tu frontend
app.use(cors({}));
// Le decimos a nuestra app: "Usa el guardia de seguridad CORS. Permite que cualquier dominio te haga peticiones".

// Middlewares para procesar JSON y datos de formularios
app.use(express.json());
// Le decimos a la app: "Si te llega una petición con datos en formato JSON en el cuerpo (body), por favor, entiéndelo y conviértelo en un objeto JavaScript para que yo pueda usarlo en `req.body`".

app.use(express.urlencoded({ extended: true }));
// Similar al anterior, pero para datos que vienen de formularios HTML tradicionales.

// Servir archivos estáticos desde la carpeta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Le decimos a la app: "Crea una ruta virtual llamada '/uploads'. Cuando alguien pida un archivo de esa ruta (ej. /uploads/mi-foto.jpg), no ejecutes ninguna lógica. Simplemente busca ese archivo en la carpeta física 'uploads' de mi proyecto y envíalo directamente".
// `path.join(__dirname, 'uploads')` construye la ruta a esa carpeta de forma segura.

// --- 4. Conexión a la Base de Datos ---

mongoose.connect(process.env.MONGO_URI)
// `mongoose.connect`: Intenta conectarse a la base de datos usando la URL que cargamos desde el archivo `.env`.
// Las opciones `{...}` son configuraciones recomendadas para evitar advertencias.

.then(() => console.log("✅ Conectado a la base de datos MongoDB"))
// `.then()`: Si la conexión tiene ÉXITO, ejecuta esta función, que imprime un mensaje de confirmación en la consola.

.catch(err => console.error("❌ Error de conexión a MongoDB:", err));
// `.catch()`: Si la conexión FALLA, ejecuta esta función, que imprime el error en la consola.

// --- 5. Definición de las Rutas Principales ---

const usuarioRoutes = require('./routes/usuarios');
// Importamos el "mapa de rutas" que definimos en otro archivo para mantener el código organizado.

app.use('/api/usuarios', usuarioRoutes);
// Le decimos a la app: "Para cualquier petición cuya URL empiece con '/api/usuarios' (ej. /api/usuarios/agregar, /api/usuarios/obtener), delega la responsabilidad al enrutador `usuarioRoutes` que acabamos de importar".

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor de gestión de usuarios funcionando correctamente.');
});
// Creamos una ruta simple en la raíz ('/') para verificar rápidamente que el servidor está vivo. Si visitas `http://localhost:5000` en tu navegador, verás este mensaje.

// --- 6. Manejo de Errores ---

// Middleware de manejo de errores global
app.use((err, req, res, next) => {

  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      mensaje: 'La imagen supera el tamaño máximo permitido (10MB).'
    });
  }

  if (err.message.includes('Formato de archivo')) {
    return res.status(400).json({
      mensaje: err.message
    });
  }

  console.error("Ocurrió un error no manejado:", err.stack);

  res.status(500).json({ 
    mensaje: 'Algo salió muy mal en el servidor.',
    detalle: err.message
  });
});
// Este es un "atrapa-todo" de errores. Si en alguna parte de tu código (en los controladores) llamas a `next(error)`, la petición saltará directamente a este middleware.
// Su trabajo es evitar que el servidor se caiga por un error inesperado y enviar una respuesta de error genérica y segura al cliente.

// --- 7. Iniciar el Servidor ---

const PORT = process.env.PORT || 5000;
// Definimos el puerto. Intenta usar el que está en el archivo `.env`. Si no existe, usa el puerto 5000 por defecto.

app.listen(PORT, () => {
  console.log(`🟢 Servidor corriendo en el puerto ${PORT}`);
});
// `app.listen`: El comando final. Le dice a nuestra aplicación que empiece a "escuchar" peticiones en el puerto que definimos.
// La función de callback se ejecuta una sola vez, cuando el servidor está listo, para informarnos que todo ha comenzado correctamente.