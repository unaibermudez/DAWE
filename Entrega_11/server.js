// server.js
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Servir archivos estáticos desde el directorio 'public'
app.use(express.static(path.join(__dirname, 'public')));


// Middleware para verificar la autenticación del usuario
function requireAuth(req, res, next) {
    const authToken = req.get('Authorization');

    // Verificar si el usuario está autenticado
    if (!authToken) {
        return res.status(401).send('Please login first');
    }
    // Continuar con el siguiente middleware si el usuario está autenticado
    next();
}

// Ruta para servir la página de usuarios protegida
app.get('/users', requireAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'users.html'));
});

// Ruta para servir la página de inicio
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'email-password.html'));
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor en ejecución en el puerto ${port}`);
});
