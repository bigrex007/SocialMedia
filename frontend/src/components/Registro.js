// Registro.js
import React, { useState } from 'react';
import axios from 'axios'; // Asegúrate de tener axios instalado
import '../App.css'; // Reutilizamos los estilos del login para mantener la consistencia

const Registro = ({ onRegistroExitoso, onMostrarLogin }) => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [error, setError] = useState('');

    const handleRegistro = async (e) => {
        e.preventDefault();
        setError('');
        try {
            // Asume que tienes un endpoint `/api/usuarios/registrar` en tu backend para el registro
            const response = await axios.post('http://localhost:5000/api/usuarios/registrar', { nombre, email, contraseña });
            // Manejar aquí la respuesta. Por ejemplo, puedes guardar el token en localStorage
            localStorage.setItem('token', response.data.token);
            onRegistroExitoso(response.data);
        } catch (err) {
            // Aquí capturas errores específicos de tu API o problemas de red
            setError('Error al registrar. Por favor, intenta de nuevo.');
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleRegistro}>
                <h2>Registro</h2>
                {error && <p className="login-error">{error}</p>}
                <input
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="f"
                    placeholder="Contraseña"
                    value={contraseña}
                    onChange={(e) => setContraseña(e.target.value)}
                    required
                />
                <button type="submit">Registrarse</button>
                <div className="switch-to-register">
                    ¿Ya tienes cuenta?<br></br>
                    <button onClick={onMostrarLogin}>Inicia sesión</button>
                </div>
            </form>
        </div>
    );
};

export default Registro;