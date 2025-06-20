import axios from 'axios';
import authService from './authService'; // Para obter as credenciais de admin


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

const productService = {
  // Função para obter todos os produtos
  getAllProducts: async () => {
    try {
      const response = await axios.get('/api/products');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar produtos:', error.response?.data || error.message);
      if (error.response && error.response.data && error.response.data.message) {
        throw new Error(error.response.data.message);
      } else if (error.response && error.response.data && error.response.data.details) {
        throw new Error(error.response.data.details.join('; '));
      }
      throw new Error('Ocorreu um erro inesperado ao buscar produtos.');
    }
  },

  // Função para obter um produto por ID
  getProductById: async (id) => {
    try {
      const response = await axios.get(`/api/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar produto com ID ${id}:`, error.response?.data || error.message);
      if (error.response) {
        if (error.response.status === 404) {
          throw new Error(`Produto com ID ${id} não encontrado.`);
        } else if (error.response.data && error.response.data.message) {
          throw new Error(error.response.data.message);
        }
      }
      throw new Error(`Ocorreu um erro inesperado ao buscar produto com ID ${id}.`);
    }
  },

  createProduct: async (productData, username, password) => {
    try {
      const config = { auth: { username, password } }; // Credenciais passadas explicitamente para esta ação de ADMIN
      const response = await axios.post('/api/products', productData, config);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar produto:', error.response?.data || error.message);
      if (error.response) {
        if (error.response.status === 401 || error.response.status === 403) {
          throw new Error('Você não tem permissão para criar produtos.');
        } else if (error.response.data && error.response.data.message) {
          throw new Error(error.response.data.message);
        } else if (error.response.data && error.response.data.details) {
          throw new Error(error.response.data.details.join('; '));
        }
      }
      throw new Error('Ocorreu um erro inesperado ao criar o produto.');
    }
  },


  updateProduct: async (id, productData, username, password) => {
    try {
      const config = { auth: { username, password } }; // Credenciais passadas explicitamente para esta ação de ADMIN
      const response = await axios.put(`/api/products/${id}`, productData, config);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar produto com ID ${id}:`, error.response?.data || error.message);
      if (error.response) {
        if (error.response.status === 401 || error.response.status === 403) {
          throw new Error('Você não tem permissão para atualizar produtos.');
        } else if (error.response.status === 404) {
          throw new Error(`Produto com ID ${id} não encontrado para atualização.`);
        } else if (error.response.data && error.response.data.message) {
          throw new Error(error.response.data.message);
        } else if (error.response.data && error.response.data.details) {
          throw new Error(error.response.data.details.join('; '));
        }
      }
      throw new Error(`Ocorreu um erro inesperado ao atualizar o produto com ID ${id}.`);
    }
  },


  deleteProduct: async (id, username, password) => {
    try {
      const config = { auth: { username, password } };
      await axios.delete(`/api/products/${id}`, config);
      return 'Produto deletado com sucesso!';
    } catch (error) {
      console.error(`Erro ao deletar produto com ID ${id}:`, error.response?.data || error.message);
      if (error.response) {
        if (error.response.status === 401 || error.response.status === 403) {
          throw new Error('Você não tem permissão para deletar produtos.');
        } else if (error.response.status === 404) {
          throw new Error(`Produto com ID ${id} não encontrado para exclusão.`);
        } else if (error.response.data && error.response.data.message) {
          throw new Error(error.response.data.message);
        }
      }
      throw new Error(`Ocorreu um erro inesperado ao deletar o produto com ID ${id}.`);
    }
  },
};

export default productService;