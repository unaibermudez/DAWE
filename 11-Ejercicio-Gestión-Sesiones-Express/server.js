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
    console.log('Authorization:', authToken);

    // Verificar si el usuario está autenticado
    if (!authToken) {
        res.sendFile(path.join(__dirname, 'public', 'please-login.html')); // Archivo que muestra "Please log in"
    } else {
        // Continuar con el siguiente middleware si el usuario está autenticado
        next();
    }
}

// Ruta para servir la página de usuarios protegida
app.get('/users', requireAuth, (req, res) => {
    // Obtener datos del usuario autenticado (si existen)
    const currentUser = firebase.auth().currentUser;
    console.log('currentUser:', currentUser); 
    let userData = null;

    if (currentUser) {
        userData = {
            displayName: currentUser.displayName,
            email: currentUser.email,
            photoURL: currentUser.photoURL,
            uid: currentUser.uid
        };
    }

    // Renderizar la página de usuarios con los datos del usuario (o null si no está autenticado)
    res.render('users', { user: userData });
});


// Ruta para servir la página de inicio
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'email-password.html'));
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor en ejecución en el puerto ${port}`);
});
