// usuarioRoutes.js
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Ruta para registrar un nuevo usuario
router.post('/registrar', usuarioController.registrar);

// Ruta para iniciar sesión
router.post('/iniciarSesion', usuarioController.iniciarSesion);

// Aquí puedes añadir más rutas de usuario según sea necesario

module.exports = router;