import axios from 'axios';
import React, { useState } from 'react';
import './Registro.css';

const Register = () => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (senha !== confirmarSenha) {
      setError('As senhas não coincidem.');
      setTimeout(() => {
        setError('');
      }, 3000);
      return;
    }

    const requestAPI = axios;
    await requestAPI.post('http://127.0.0.1:5000/register', {
        usuario,
        senha
        }).then((res) => {
        if (res.data.resultado) {
            window.location.href = '/login';
        } else {
            setError('Erro ao registrar, tente novamente.');
            setTimeout(() => {
            setError('');
            }, 3000);
            return;
        }
        }
    );
  };

  return (
    <div className="register-container">
      <h2>Registro</h2>
      <form>
        <div className="form-group">
          <label htmlFor="reg-username">Nome de usuário</label>
          <input
            type="text"
            id="reg-username"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="reg-password">Senha</label>
          <input
            type="password"
            id="reg-password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="reg-confirm-password">Confirmar Senha</label>
          <input
            type="password"
            id="reg-confirm-password"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="button" onClick={handleRegister}>
          Registrar
        </button>
      </form>
    </div>
  );
};

export default Register;
