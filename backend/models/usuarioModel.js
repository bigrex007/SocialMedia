const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    contraseña: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, { timestamps: true });

// Middleware para hash de contraseña
usuarioSchema.pre('save', async function (next) {
    if (this.isModified('contraseña')) {
        this.contraseña = await bcrypt.hash(this.contraseña, 8);
    }
    next();
});

// Método para generar un token JWT y guardarlo en el array de tokens del usuario
usuarioSchema.methods.generarAuthToken = async function() {
    const usuario = this;
    const token = jwt.sign({ _id: usuario._id.toString() }, 'tuClaveSecreta', { expiresIn: '7d' });

    usuario.tokens = usuario.tokens.concat({ token });
    await usuario.save();

    return token;
};

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;