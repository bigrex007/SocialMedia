// postController.js
const Post = require('../models/postModel');

const postController = {
    // Crear un nuevo post
    async crearPost(req, res) {
        try {
            const post = new Post({ ...req.body, autor: req.usuario._id });
            await post.save();
            res.status(201).send(post);
        } catch (error) {
            res.status(400).send(error);
        }
    },

    // Obtener posts
    async obtenerPosts(req, res) {
        try {
            const posts = await Post.find({}).populate('autor', 'nombre');
            res.send(posts);
        } catch (error) {
            res.status(500).send(error);
        }
    },

    // Eliminar un post
    async eliminarPost(req, res) {
        try {
            const post = await Post.findOneAndDelete({ _id: req.params.id, autor: req.usuario._id });
            if (!post) {
                return res.status(404).send();
            }
            res.send(post);
        } catch (error) {
            res.status(500).send(error);
        }
    },

    // Dar "like" a un post
    async darLike(req, res) {
        try {
            const post = await Post.findById(req.params.id);
            if (!post) {
                return res.status(404).send();
            }
            // Añadir el ID del usuario al array de likes si aún no está
            if (!post.likes.includes(req.usuario._id)) {
                post.likes.push(req.usuario._id);
                await post.save();
            }
            res.json(post);
        } catch (error) {
            res.status(500).send(error);
        }
    },

    // Quitar "like" a un post
    async quitarLike(req, res) {
        try {
            const post = await Post.findById(req.params.id);
            if (!post) {
                return res.status(404).send();
            }
            // Remover el ID del usuario del array de likes
            const index = post.likes.indexOf(req.usuario._id);
            if (index > -1) {
                post.likes.splice(index, 1);
                await post.save();
            }
            res.json(post);
        } catch (error) {
            res.status(500).send(error);
        }
    },

};

module.exports = postController;