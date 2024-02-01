// PostsPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';; // Reutilizando el mismo archivo CSS para mantener la consistencia del tema

const PostsPage = ({ user, onLogout }) => {
    const [posts, setPosts] = useState([]);
    const [nuevoPost, setNuevoPost] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // Asegúrate de reemplazar la URL con la ruta correcta de tu API
                const response = await axios.get('http://localhost:5000/api/posts', {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                });
                setPosts(response.data);
            } catch (error) {
                console.error("Error al obtener los posts:", error);
            }
        };
        fetchPosts();
    }, [user.token]);

    const fetchPosts = async () => {
        try {
            // Asegúrate de reemplazar la URL con la ruta correcta de tu API
            const response = await axios.get('http://localhost:5000/api/posts', {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            setPosts(response.data);
        } catch (error) {
            console.error("Error al obtener los posts:", error);
        }
    };

    const handleCrearPost = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/posts', { contenido: nuevoPost }, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            setNuevoPost('');
            fetchPosts(); // Recargar los posts después de crear uno nuevo
        } catch (error) {
            console.error("Error al crear el post:", error);
        }
    };

    const handleEliminarPost = async (postId) => {
        try {
            await axios.delete(`http://localhost:5000/api/posts/${postId}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            // Filtrar el post eliminado del estado de posts
            setPosts(posts.filter(post => post._id !== postId));
        } catch (error) {
            console.error("Error al eliminar el post:", error);
        }
    };

    const toggleLike = async (post) => {
        try {
            const url = `http://localhost:5000/api/posts/${post._id}/${post.likes.includes(user._id) ? 'unlike' : 'like'}`;
            await axios.patch(url, {}, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            // Actualiza los posts para reflejar el cambio de likes
            fetchPosts();
        } catch (error) {
            console.error("Error al dar/quitar like al post:", error);
        }
    };

    return (
        <div className="posts-page">
            <header className="app-header">
                <h2>Posts</h2>
                <div className="user-info">
                    <span>{user.nombre}</span>
                    <button onClick={onLogout}>Cerrar Sesión</button>
                </div>
            </header>
            <form onSubmit={handleCrearPost}>
                <input
                    type="text"
                    placeholder="¿Qué estás pensando?"
                    value={nuevoPost}
                    onChange={(e) => setNuevoPost(e.target.value)}
                    required
                />
                <button type="submit">Publicar</button>
            </form>
            <div className="posts-container">
                {posts.map(post => (
                    <div key={post._id} className="post">
                        <h3>{post.autor.nombre}</h3>
                        <p>{post.contenido}</p>
                        <button onClick={() => toggleLike(post)}>
                            {post.likes.includes(user._id) ? 'Quitar like' : 'Dar like'} - {post.likes.length}
                        </button>
                        {user._id === post.autor._id && (
                            <button onClick={() => handleEliminarPost(post._id)}>Eliminar</button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostsPage;