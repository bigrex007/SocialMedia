const express = require('express');
const usuarioRoutes = require('./routes/usuarioRoutes');
const postRoutes = require('./routes/postRoutes');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const mongoURI = 'mongodb+srv://test:123@testdatabase.oh49bmu.mongodb.net/SocialMedia?retryWrites=true&w=majority';
mongoose.connect(mongoURI, {})
.then(() => console.log('Conexión a MongoDB establecida con éxito.'))
.catch(err => console.error('Error conectando a MongoDB:', err));

app.use(cors());
app.use(express.json()); // Middleware para parsear el cuerpo de las solicitudes a JSON

// Usar las rutas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/posts', postRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});