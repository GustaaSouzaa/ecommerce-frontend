import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import productService from '../services/productService';
import { useAuth } from '../contexts/AuthContext'; // Para verificar a role
import { toast } from 'react-toastify';
import ProductForm from '../components/ProductForm';
import '../styles/AdminProductPage.css'; 

function AdminProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false); // Estado para mostrar/esconder formulário de edição/criação
  const [currentProduct, setCurrentProduct] = useState(null); 

  const { currentUser } = useAuth(); 
  const navigate = useNavigate();

  // Verificar se o usuário é ADMIN
  useEffect(() => {
    if (!currentUser || currentUser.role !== 'ROLE_ADMIN') {
      toast.error('Acesso negado. Você não tem permissões de administrador.');
      navigate('/'); // Redireciona para a home ou outra página
      return;
    }
  }, [currentUser, navigate]);

  // Função para buscar todos os produtos (pode ser a mesma de ProductListPage)
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await productService.getAllProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message || 'Erro ao carregar produtos para administração.');
      toast.error(err.message || 'Erro ao carregar produtos para administração.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (currentUser && currentUser.role === 'ROLE_ADMIN') { // Apenas busca se for admin
      fetchProducts();
    }
  }, [fetchProducts, currentUser]);

  // Lógica para Criar/Editar Produto
  const handleSaveProduct = async (productData) => {
    try {
      let response;
      if (productData.id) { // Se tem ID, é edição
        response = await productService.updateProduct(productData.id, productData, currentUser.username, currentUser.password);
        toast.success(`"${response.name}" atualizado com sucesso!`);
      } else { // Se não tem ID, é criação
        response = await productService.createProduct(productData, currentUser.username, currentUser.password);
        toast.success(`"${response.name}" criado com sucesso!`);
      }
      setShowForm(false); // Esconde o formulário
      fetchProducts(); // Recarrega a lista de produtos
    } catch (err) {
      toast.error(err.message || 'Erro ao salvar produto.');
    }
  };

  // Lógica para Deletar Produto
  const handleDeleteProduct = async (productId, productName) => {
    if (window.confirm(`Tem certeza que deseja deletar "${productName}"?`)) { // Confirmação
      try {
        await productService.deleteProduct(productId, currentUser.username, currentUser.password);
        toast.success(`"${productName}" deletado com sucesso!`);
        fetchProducts(); // Recarrega a lista de produtos
      } catch (err) {
        toast.error(err.message || 'Erro ao deletar produto.');
      }
    }
  };

  // Abrir formulário para criar novo
  const handleCreateNew = () => {
    setCurrentProduct(null); // Limpa o produto atual (para criação)
    setShowForm(true); // Mostra o formulário
  };

  // Abrir formulário para editar
  const handleEdit = (product) => {
    setCurrentProduct(product); // Define o produto a ser editado
    setShowForm(true); // Mostra o formulário
  };

  if (loading) {
    return <div className="loading-message">Carregando produtos para administração...</div>;
  }

  if (error) {
    return <div className="error-display">Erro: {error}</div>;
  }

  // Se não for admin, não renderiza a página de administração (já deve ter redirecionado)
  if (!currentUser || currentUser.role !== 'ROLE_ADMIN') {
    return null; 
  }

  return (
    <div className="admin-page container">
      <h2>Gerenciar Produtos</h2>

      <button className="primary-button add-new-button" onClick={handleCreateNew}>Criar Novo Produto</button>

      {showForm && (
        <ProductForm product={currentProduct} onSave={handleSaveProduct} onCancel={() => setShowForm(false)} />
      )}

      <div className="admin-product-list">
        {products.length > 0 ? (
          <table className="product-admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Preço</th>
                <th>Estoque</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>R$ {product.price ? product.price.toFixed(2) : 'N/A'}</td>
                  <td>{product.stockQuantity}</td>
                  <td className="admin-actions">
                    <button className="secondary-button edit-button" onClick={() => handleEdit(product)}>Editar</button>
                    <button className="delete-button" onClick={() => handleDeleteProduct(product.id, product.name)}>Deletar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-products-message">Nenhum produto encontrado para gerenciar.</p>
        )}
      </div>
    </div>
  );
}

export default AdminProductPage;