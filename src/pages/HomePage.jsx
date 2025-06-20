import React, { useEffect } from 'react';
import { toast } from 'react-toastify'; 
import authService from '../services/authService';
import '../styles/HomePage.css';

function HomePage() {
  const currentUser = authService.getCurrentUser();

  useEffect(() => {
    if (currentUser) {
      toast.success(`Bem-vindo de volta, ${currentUser.username}!`);
    }
  }, [currentUser]); 

  return (
    <div className="home-page-container">
      <h2>Bem-vindo à Sua Loja Online!</h2>
      <p>Encontre os melhores produtos aqui.</p>
      {/* Você pode adicionar mais conteúdo ou links aqui */}
    </div>
  );
}

export default HomePage;