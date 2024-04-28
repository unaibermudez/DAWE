const mongoose = require('mongoose');

// Definir el esquema de usuario
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Crear un modelo de usuario a partir del esquema
const User = mongoose.model('User', userSchema);

module.exports = User;
