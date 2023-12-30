import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  
  const handleLogin = async () => {
    const requestAPI = axios;
    await requestAPI.post('http://127.0.0.1:5000/login', {
        usuario,
        senha
        }).then((res) => {
         if (res.data.resultado) {
            localStorage.setItem('token', res.data.access_token);
            localStorage.setItem('user', JSON.stringify({
              usuario: res.data.user_nome,
              id_usuario: res.data.user_id
            }));
            if (res.data.perfil === 'admin') {
              setTimeout(() => {
                window.location.href = '/dashboard';
                }, 500);
            } else {
              setTimeout(() => {
                window.location.href = '/home';
                }, 500);
            }
         } else {
            setError('Usuário ou senha incorretos.');
            setTimeout(() => {
              setError('');
            }, 3000);
            return;
         }
        }
    );
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form>
        <div className="form-group">
          <label htmlFor="username">Nome de usuário</label>
          <input
            type="text"
            id="username"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="button" className="btn-login" onClick={handleLogin}>
          Login
        </button>
        <p>Não possui uma conta? <Link to="/register">Crie uma aqui</Link></p>
      </form>
    </div>
  );
};

export default Login;
