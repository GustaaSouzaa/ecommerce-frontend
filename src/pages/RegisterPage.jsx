import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';
import { toast } from 'react-toastify';
import '../styles/AuthPage.css';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('ROLE_USER');

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const responseMessage = await authService.register(username, password, role);
      toast.success(responseMessage + ' Redirecionando para o login...'); 

      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (error) {
      toast.error(error.message); 
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Registrar</h2>
        <form onSubmit={handleRegister}>
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
          <div className="form-group">
            <label htmlFor="role">Tipo de Usuário:</label>
            <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="ROLE_USER">Usuário Comum</option>
              <option value="ROLE_ADMIN">Administrador</option>
            </select>
          </div>
          <button type="submit" className="primary-button">Registrar</button>
        </form>
        {/* REMOVIDO: Bloco de mensagem de feedback local */}
        <p className="auth-link-text">
          Já tem uma conta? <Link to="/login">Faça login aqui</Link>.
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;