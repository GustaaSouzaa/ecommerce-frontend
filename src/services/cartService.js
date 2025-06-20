import axios from 'axios';
import authService from './authService';


const getAuthHeaders = () => {
  const user = authService.getCurrentUser();
  if (user && user.username && user.password) {
    return {
      auth: {
        username: user.username,
        password: user.password,
      },
    };
  }
  return {};
};

const cartService = {
  addProductToCart: async (productId, quantity) => {
    try {
      const config = getAuthHeaders();
      // Validação de login antes de enviar
      if (!config.auth || !authService.getCurrentUser()) {
        throw new Error('Você precisa estar logado para adicionar itens ao carrinho.');
      }
      const response = await axios.post('/api/cart/add', { productId, quantity }, config); // URL relativa
      return response.data;
    } catch (error) {
      console.error('Erro ao adicionar produto ao carrinho:', error.response?.data || error.message);
      if (error.response) {
        if (error.response.status === 401 || error.response.status === 403) {
          throw new Error('Você precisa estar logado para adicionar itens ao carrinho.');
        } else if (error.response.data && error.response.data.message) {
          throw new Error(error.response.data.message);
        } else if (error.response.data && error.response.data.details) {
          throw new Error(error.response.data.details.join('; '));
        }
      }
      throw new Error('Ocorreu um erro inesperado ao adicionar produto ao carrinho.');
    }
  },

  getCart: async () => {
    try {
      const config = getAuthHeaders();
      if (!config.auth || !authService.getCurrentUser()) {
        throw new Error('Você precisa estar logado para ver o carrinho.');
      }
      const response = await axios.get('/api/cart', config); // URL relativa
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar carrinho:', error.response?.data || error.message);
      if (error.response) {
        if (error.response.status === 401 || error.response.status === 403) {
          throw new Error('Você precisa estar logado para ver o carrinho.');
        } else if (error.response.data && error.response.data.message) {
          throw new Error(error.response.data.message);
        }
      }
      throw new Error('Ocorreu um erro inesperado ao buscar carrinho.');
    }
  },

  removeProductFromCart: async (productId) => {
    try {
      const config = getAuthHeaders();
      if (!config.auth || !authService.getCurrentUser()) {
        throw new Error('Você precisa estar logado para remover itens do carrinho.');
      }
      const response = await axios.delete(`/api/cart/remove/${productId}`, config); // URL relativa
      return response.data;
    } catch (error) {
      console.error('Erro ao remover produto do carrinho:', error.response?.data || error.message);
      if (error.response) {
        if (error.response.status === 401 || error.response.status === 403) {
          throw new Error('Você precisa estar logado para remover itens do carrinho.');
        } else if (error.response.data && error.response.data.message) {
          throw new Error(error.response.data.message);
        }
      }
      throw new Error('Ocorreu um erro inesperado ao remover produto do carrinho.');
    }
  },

  clearCart: async () => {
    try {
      const config = getAuthHeaders();
      if (!config.auth || !authService.getCurrentUser()) {
        throw new Error('Você precisa estar logado para esvaziar o carrinho.');
      }
      await axios.delete('/api/cart/clear', config); // URL relativa
      return 'Carrinho esvaziado com sucesso!';
    } catch (error) {
      console.error('Erro ao esvaziar carrinho:', error.response?.data || error.message);
      if (error.response) {
        if (error.response.status === 401 || error.response.status === 403) {
          throw new Error('Você precisa estar logado para esvaziar o carrinho.');
        } else if (error.response.data && error.response.data.message) {
          throw new Error(error.response.data.message);
        }
      }
      throw new Error('Ocorreu um erro inesperado ao esvaziar carrinho.');
    }
  },
};

export default cartService;