// middleware/auth.js
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarioModel');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, 'tuClaveSecreta');
        const usuario = await Usuario.findOne({ _id: decoded._id, 'tokens.token': token });

        if (!usuario) {
            throw new Error();
        }

        req.token = token;
        req.usuario = usuario;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send({ error: 'Por favor, autentícate.' });
    }
};

module.exports = auth;