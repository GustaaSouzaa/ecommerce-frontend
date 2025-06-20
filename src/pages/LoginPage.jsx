import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify'; 
import '../styles/AuthPage.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await login(username, password);
      toast.success(response.message);

      setTimeout(() => {
        navigate('/products');
        window.location.reload(); 
      }, 1000);

    } catch (error) {
      toast.error(error.message); 
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Nome de Usuário:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="primary-button">Fazer Login</button>
        </form>
        {/* REMOVIDO: Bloco de mensagem de feedback local */}
        <p className="auth-link-text">
          Não tem uma conta? <Link to="/register">Registre-se aqui</Link>.
        </p>
      </div>
    </div>
  );
}

export default LoginPage;