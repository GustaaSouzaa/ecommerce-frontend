import axios from 'axios';

// const API_BASE_URL = 'http://localhost:8080/api'; // Removida para usar proxy Vite

const authService = {
  register: async (username, password, role) => {
    try {
      const response = await axios.post('/api/auth/register', { // URL relativa
        username,
        password,
        role,
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        if (error.response.data && error.response.data.message) {
          throw new Error(error.response.data.message);
        } else if (error.response.data && error.response.data.details) {
          throw new Error(error.response.data.details.join('; '));
        }
      }
      throw new Error('Ocorreu um erro inesperado ao registrar.');
    }
  },

  login: async (username, password) => {
    try {
      // O backend agora retorna um objeto { message, username, role }
      const response = await axios.post('/api/auth/login', { username, password }, { // URL relativa
        auth: { username, password },
      });

      // *** CORREÇÃO AQUI: SALVAR TAMBÉM A ROLE RECEBIDA DO BACKEND NO LOCALSTORAGE ***
      localStorage.setItem('user', JSON.stringify({
        username: response.data.username, // Pega o username da resposta do backend
        password: password, // Mantém a senha original (para Basic Auth simulado)
        role: response.data.role // <<< CRÍTICO: SALVAR A ROLE AQUI!
      }));

      return response.data; // Retorna o objeto LoginResponse
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401 || error.response.status === 403) {
          throw new Error('Credenciais inválidas. Verifique seu nome de usuário e senha.');
        } else if (error.response.data && error.response.data.message) {
          throw new Error(error.response.data.message);
        } else if (error.response.data && error.response.data.details) {
          throw new Error(error.response.data.details.join('; '));
        }
      }
      throw new Error('Ocorreu um erro inesperado ao fazer login.');
    }
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  logout: () => {
    localStorage.removeItem('user');
  },
};

export default authService;