

      const ModeloUsuario = require('../models/Usuarios');
      const fs = require('fs');
      const path = require('path');

      const agregarUsuario = async (req, res) => {
        try {
          // El middleware 'upload.single' ya se ejecutó, así que 'req.file' está disponible.
          if (!req.file) {
            return res.status(400).json({ mensaje: 'La imagen es un campo requerido' });
          }

          const { nombre, apellido, cedula, email, telefono } = req.body;
          
        
          const nuevoUsuario = new ModeloUsuario({
            nombre,
            apellido,
            cedula,
            email,
            telefono,
            imagen: req.file.filename 
          });

          const usuarioGuardado = await nuevoUsuario.save();
          res.status(201).json(usuarioGuardado);

        } catch (error) {
          // Si el error es por clave duplicada (cédula o email ya existen)
          if (error.code === 11000) {
            const campo = Object.keys(error.keyValue)[0];
            return res.status(409).json({ 
              mensaje: `El ${campo} '${error.keyValue[campo]}' ya está registrado.` 
            });
          }

          // Si es un error de validación de Mongoose (campos faltantes, formato incorrecto)
          if (error.name === 'ValidationError') {
            const mensajes = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ 
              mensaje: 'Datos inválidos',
              errores: mensajes 
            });
          }

          // Para cualquier otro error inesperado
          console.error('Error interno al agregar usuario:', error);
          res.status(500).json({ mensaje: 'Error interno del servidor. Inténtalo más tarde.' });
        }
      };


          const obtenerTodosLosUsuarios = async (req, res) => {
          try {
              const usuarios = await ModeloUsuario.find(); // La variable se llama usuarios
              res.status(200).json(usuarios);
          } catch (error) {
              res.status(500).json({ mensaje: 'Error al obtener los usuarios' });
          }
      };

  
      const actualizarUsuario = async (req, res) => {
          try {
              const { id } = req.params;
              const usuario = await ModeloUsuario.findById(id); // Usa findById para un solo documento
              if (!usuario) {
                  return res.status(404).json({ mensaje: 'Usuario no encontrado' });
              }
              const imagenAntigua = usuario.imagen;
              
              usuario.nombre = req.body.nombre || usuario.nombre;
              usuario.apellido = req.body.apellido || usuario.apellido;
              usuario.cedula = req.body.cedula || usuario.cedula;
              usuario.email = req.body.email || usuario.email;
              usuario.telefono = req.body.telefono || usuario.telefono;

              if (req.file) {
                  usuario.imagen = req.file.filename;
                  const rutaImagenAntigua = path.join(__dirname, '../uploads', imagenAntigua);
                  if (fs.existsSync(rutaImagenAntigua)) {
                      fs.unlinkSync(rutaImagenAntigua);
                      console.log(`Imagen antigua eliminada:${imagenAntigua}`);
                  
                  }
              }

              const usuarioActualizado = await usuario.save();
              res.status(200).json(usuarioActualizado);

          } catch (error) {
              if (error.code === 11000) {
                  const campo = Object.keys(error.keyValue)[0];
                  return res.status(409).json({ mensaje: `El ${campo} '${error.keyValue[campo]}' ya está registrado.` });
              }
              if (error.name === 'ValidationError') {
                  const mensajes = Object.values(error.errors).map(val => val.message);
                  return res.status(400).json({ mensaje: 'Datos inválidos', errores: mensajes });
              }
              console.error('Error al actualizar el usuario:', error);
              res.status(500).json({ mensaje: 'Error interno del servidor.' });
          }
      };
      const eliminarUsuario = async (req, res) => {
          try {
              const { id } = req.params;
              
              // Busca y elimina el usuario en un solo paso. findByIdAndDelete devuelve el documento eliminado.
              const usuarioEliminado = await ModeloUsuario.findByIdAndDelete(id);

              if (!usuarioEliminado) {
                  return res.status(404).json({ mensaje: 'Usuario no encontrado' });
              }

            
              const rutaImagen = path.join(__dirname, '../uploads', usuarioEliminado.imagen);
              if (fs.existsSync(rutaImagen)) {
                  fs.unlinkSync(rutaImagen);
              }

              res.status(200).json({ mensaje: 'Usuario eliminado con éxito' });

          } catch (error) {
              console.error('Error al eliminar el usuario:', error);
                  res.status(500).json({ mensaje: 'Error interno del servidor.' });
              }
          };

        

          const obtenerUsuarioPorId = async (req, res) => {
              try {
                  const usuario = await ModeloUsuario.findById(req.params.id);
                  if (!usuario) {
                      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
                  }
                  res.status(200).json(usuario);
              } catch (error) {
                  res.status(500).json({ mensaje: 'Error al obtener el usuario' });
              }
          };

          // Exportamos todas las funciones
          module.exports = {
            agregarUsuario,
            obtenerTodosLosUsuarios,
            actualizarUsuario,
            obtenerUsuarioPorId,
            eliminarUsuario
          };