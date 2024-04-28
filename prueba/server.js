// server.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const User = require('./models/User'); // Modelo de Usuario en MongoDB

const app = express();
const port = process.env.PORT || 3000;

// Configuración de MongoDB
mongoose.connect('mongodb://localhost/your_database_name', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conexión exitosa a MongoDB');
});

// Configuración de sesiones en Express
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));

// Middleware para parsear JSON en solicitudes POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir archivos estáticos desde el directorio 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para la página de inicio
app.get('/', (req, res) => {
  if (req.session.userId) {
    res.redirect('/users');
  } else {
    res.sendFile(path.join(__dirname, 'public', 'email-password.html'));
  }
});

// Ruta para el inicio de sesión
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && user.password === password) {
      req.session.userId = user._id; // Establecer el ID de usuario en la sesión
      res.redirect('/users');
    } else {
      res.status(401).send('Credenciales inválidas');
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).send('Error del servidor');
  }
});

// Ruta para el cierre de sesión
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error al cerrar sesión:', err);
      res.status(500).send('Error del servidor');
    } else {
      res.redirect('/?logout=true');
    }
  });
});

// Ruta protegida para usuarios autenticados
app.get('/users', async (req, res) => {
  try {
    if (req.session.userId) {
      const user = await User.findById(req.session.userId);
      if (user) {
        res.send(`¡Hola, ${user.email}! Este es el panel de usuario.`);
      } else {
        res.redirect('/?logout=true');
      }
    } else {
      res.redirect('/');
    }
  } catch (error) {
    console.error('Error al cargar la página de usuarios:', error);
    res.status(500).send('Error del servidor');
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Express en ejecución en el puerto ${port}`);
});
