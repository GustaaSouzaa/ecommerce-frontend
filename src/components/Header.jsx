import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import '../styles/Header.css';

function Header() {
  const { currentUser, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    window.location.reload();
  };

  return (
    <header className="header-container">
      <div className="header-content container">
        <h1 className="site-title"><Link to="/">Meu E-commerce</Link></h1>
        <nav className="main-nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Produtos</Link></li>
            {currentUser ? ( // Se o usuário está logado
              <>
                <li><Link to="/cart">Carrinho</Link></li>
                <li><Link to="/order-history">Meus Pedidos</Link></li>
                {currentUser.role === 'ROLE_ADMIN' && ( // <<< Renderiza link Admin APENAS para ADMIN
                  <li><Link to="/admin/products">Admin Produtos</Link></li>
                )}
                <li className="welcome-message">Bem-vindo, {currentUser.username}!</li>
                <li><button onClick={handleLogout} className="logout-button secondary-button">Logout</button></li>
              </>
            ) : ( // Se o usuário NÃO está logado
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Registrar</Link></li>
              </>
            )}
            <li>
              <button onClick={toggleTheme} className="theme-toggle-button secondary-button">
                {theme === 'light' ? 'Modo Escuro' : 'Modo Claro'}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;