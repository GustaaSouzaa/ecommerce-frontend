import React, { createContext, useState, useEffect, useContext } from 'react';

// Cria o Contexto do Tema
const ThemeContext = createContext(null);


export const ThemeProvider = ({ children }) => {
  // Estado para o tema (string 'light' ou 'dark')
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  useEffect(() => {
    const body = document.body;
    body.classList.remove('light-mode', 'dark-mode'); // Remove classes antigas
    body.classList.add(`${theme}-mode`); // Adiciona a classe do tema atual (ex: 'dark-mode')
    localStorage.setItem('theme', theme); // Salva a preferência no localStorage
  }, [theme]); // Executa sempre que o tema muda

  // Função para alternar o tema
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // O valor que será disponibilizado para os componentes filhos
  const value = {
    theme,
    toggleTheme,
  };

  // Renderiza os filhos com o contexto
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook personalizado para usar o ThemeContext facilmente
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
  }
  return context;
};