import React from 'react';
import Header from './Header'; 
import '../styles/Layout.css'; 

function Layout({ children }) { 
  return (
    <div className="layout-container">
      <Header /> {/* 4. Renderiza o cabeçalho */}
      <main className="main-content"> {/* 5. Conteúdo principal */}
        {children} {/* 6. Onde o conteúdo das páginas será injetado */}
      </main>
      {/* Futuramente, você pode adicionar um Footer aqui */}
    </div>
  );
}

export default Layout;