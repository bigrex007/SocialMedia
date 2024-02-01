const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    contenido: {
        type: String,
        required: true
    },
    autor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Usuario'
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    }],
    likes: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Usuario' 
    }],
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;