// Login.js
import React, { useState } from 'react';
import axios from 'axios'; // Asegúrate de instalar axios con `npm install axios`
import '../App.css';

const Login = ({ onLoginSuccess, onMostrarRegistro }) => {
    const [email, setEmail] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [error, setError] = useState(''); // Para mostrar mensajes de error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Limpiar errores anteriores
        try {
            const response = await axios.post('http://localhost:5000/api/usuarios/iniciarSesion', { email, contraseña });
            // Si el login es exitoso, podrías querer hacer algo con el token, por ejemplo, guardarlo en localStorage
            localStorage.setItem('token', response.data.token);
            onLoginSuccess(response.data); // Llama a una función pasada como prop para manejar el éxito del login
        } catch (err) {
            // Manejar errores de login (por ejemplo, usuario o contraseña incorrectos)
            if (err.response && err.response.status === 400) {
                setError('Usuario o contraseña incorrectos.');
            } else {
                setError('Ocurrió un error al intentar iniciar sesión. Por favor, inténtalo de nuevo.');
            }
        }
    };  

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Iniciar Sesión</h2>
                {error && <p className="login-error">{error}</p>}
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={contraseña}
                    onChange={(e) => setContraseña(e.target.value)}
                    required
                />
                <button type="submit">Iniciar Sesión</button>
                {/* Botón o enlace para cambiar al registro */}
                <div className="switch-to-register">
                    ¿No tienes cuenta?<br></br>
                    <button onClick={onMostrarRegistro}>Regístrate</button>
                </div>
            </form>
        </div>
    );
};

export default Login;