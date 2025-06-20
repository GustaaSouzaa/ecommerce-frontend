import React, { createContext, useState, useEffect, useContext } from 'react';
import authService from '../services/authService'; 


const AuthContext = createContext(null);


export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); 
  const [loading, setLoading] = useState(true); // Estado de carregamento inicial


  useEffect(() => {
    const user = authService.getCurrentUser(); 
    if (user) {

      setCurrentUser(user);
    }
    setLoading(false); 
  }, []);


  const login = async (username, password) => {
    try {
      await authService.login(username, password); // Chama o serviço de login
      const user = authService.getCurrentUser(); // Pega o usuário (simulado) após login
      setCurrentUser(user); // Atualiza o estado
      return { success: true, message: 'Login realizado com sucesso!' };
    } catch (error) {
      throw error; // Re-lança o erro para a página de login
    }
  };

  const logout = () => {
    authService.logout(); // Chama o serviço de logout (limpa localStorage)
    setCurrentUser(null); // Limpa o usuário do estado
  };

  
  const value = {
    currentUser,
    login,
    logout,
    loading,
  };


  return (
    <AuthContext.Provider value={value}>
      {!loading && children} {/* Renderiza os filhos apenas depois de carregar o estado inicial */}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};