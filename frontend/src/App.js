import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Registro from './components/Registro'; 
import PostsPage from './components/PostsPage'; // Asegúrate de importar el nuevo componente
// Asegúrate de que las rutas de importación sean correctas

const App = () => {
    const [user, setUser] = useState(null);
    const [mostrarRegistro, setMostrarRegistro] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Aquí podrías validar el token y obtener datos del usuario
            setUser({ token }); // Simplemente se establece el token por ahora
        }
    }, []);

    const handleLoginSuccess = (data) => {
        setUser({ ...data.usuario, token: data.token });
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const handleRegistroExitoso = (data) => {
        setUser({ ...data.usuario, token: data.token });
        // Aquí podrías redirigir al usuario al dashboard o donde prefieras
    };

    return (
      <div className="App">
          {!user ? (
              mostrarRegistro ? (
                  <Registro onRegistroExitoso={handleRegistroExitoso} onMostrarLogin={() => setMostrarRegistro(false)} />
              ) : (
                  <Login onLoginSuccess={handleLoginSuccess} onMostrarRegistro={() => setMostrarRegistro(true)} />
              )
          ) : (
              <PostsPage user={user} onLogout={handleLogout} />
          )}
      </div>
    );
};

export default App;