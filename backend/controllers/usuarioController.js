// usuarioController.js
const Usuario = require('../models/usuarioModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const usuarioController = {
    // Registro de usuario
    async registrar(req, res) {
        try {
            const usuario = new Usuario(req.body);
            await usuario.save();
            // Aquí podrías generar un token JWT si lo necesitas
            const token = await usuario.generarAuthToken();
            res.status(201).send({ usuario, token });
        } catch (error) {
            res.status(400).send(error);
        }
    },

    // Inicio de sesión
    async iniciarSesion(req, res) {
        try {
            const usuario = await Usuario.findOne({ email: req.body.email });
            if (!usuario) {
                return res.status(404).send({ error: 'Usuario no encontrado' });
            }
            const esMatch = await bcrypt.compare(req.body.contraseña, usuario.contraseña);
            if (!esMatch) {
                return res.status(400).send({ error: 'Contraseña incorrecta' });
            }

            // Enviar token JWT
            const token = await usuario.generarAuthToken();
            res.send({ usuario, token });
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },

};

module.exports = usuarioController;