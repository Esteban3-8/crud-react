

const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre es obligatorio.'],
      trim: true,
      // Solo permite letras (incluyendo acentos y ñ) y espacios.
      match: [/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo puede contener letras y espacios.'],
    },
    apellido: {
      type: String,
      required: [true, 'El apellido es obligatorio.'],
      trim: true,
      // Misma regla que el nombre.
      match: [/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El apellido solo puede contener letras y espacios.'],
    },
    cedula: {
      type: String,
      required: [true, 'La cédula es obligatoria.'],
      unique: true,
      trim: true,
      // Permite solo números, con una longitud entre 7 y 15 caracteres.
      minlength: [7, 'La cédula debe tener al menos 7 dígitos.'],
      maxlength: [15, 'La cédula no puede tener más de 15 dígitos.'],
      match: [/^[0-9]+$/, 'La cédula solo puede contener números.'],
    },
    email: {
      type: String,
      required: [true, 'El email es obligatorio.'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Por favor, ingrese un email válido.'],
    },
    telefono: {
      type: String,
      required: [true, 'El teléfono es obligatorio.'],
      trim: true,
      // Permite solo números, con una longitud entre 7 (fijo) y 15 (internacional) caracteres.
      minlength: [7, 'El teléfono debe tener al menos 7 dígitos.'],
      maxlength: [15, 'El teléfono no puede tener más de 15 dígitos.'],
      match: [/^[0-9]+$/, 'El teléfono solo puede contener números.'],
    },
    imagen: {
      type: String,
      required: [true, 'La imagen es obligatoria.'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Usuario', usuarioSchema);