const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const auth = require('../middleware/auth'); // Asegúrate de que la ruta sea correcta

// Ruta para crear un nuevo post
router.post('/', auth, postController.crearPost);

// Ruta para obtener todos los posts
router.get('/', auth, postController.obtenerPosts);

// Rutas para actualizar y eliminar posts
router.delete('/:id', auth, postController.eliminarPost);

// Ruta para dar "like" a un post
router.patch('/:id/like', auth, postController.darLike);

// Ruta para quitar "like" a un post
router.patch('/:id/unlike', auth, postController.quitarLike);

module.exports = router;