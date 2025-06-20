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

const orderService = {
  createOrderFromCart: async () => {
    try {
      const config = getAuthHeaders();
      if (!config.auth || !authService.getCurrentUser()) {
        throw new Error('Você precisa estar logado para finalizar um pedido.');
      }
      const response = await axios.post('/api/orders/checkout', {}, config);
      return response.data;
    } catch (error) {
      console.error('Erro ao finalizar pedido:', error.response?.data || error.message);
      if (error.response) {
        if (error.response.status === 401 || error.response.status === 403) {
          throw new Error('Você precisa estar logado para finalizar um pedido.');
        } else if (error.response.data && error.response.data.message) {
          throw new Error(error.response.data.message);
        } else if (error.response.data && error.response.data.details) {
          throw new Error(error.response.data.details.join('; '));
        }
      }
      throw new Error('Ocorreu um erro inesperado ao finalizar pedido.');
    }
  },

  getOrderHistory: async () => {
    try {
      const config = getAuthHeaders();
      if (!config.auth || !authService.getCurrentUser()) {
        throw new Error('Você precisa estar logado para ver seu histórico de pedidos.');
      }
      const response = await axios.get('/api/orders', config);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar histórico de pedidos:', error.response?.data || error.message);
      if (error.response) {
        if (error.response.status === 401 || error.response.status === 403) {
          throw new Error('Você precisa estar logado para ver seu histórico de pedidos.');
        } else if (error.response.data && error.response.data.message) {
          throw new Error(error.response.data.message);
        }
      }
      throw new Error('Ocorreu um erro inesperado ao buscar histórico de pedidos.');
    }
  },
};

export default orderService;