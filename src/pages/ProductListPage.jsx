import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import productService from '../services/productService';
import cartService from '../services/cartService';
import authService from '../services/authService';
import { toast } from 'react-toastify'; 
import '../styles/ProductListPage.css';

function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const currentUser = authService.getCurrentUser();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getAllProducts();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Erro ao carregar produtos. Tente novamente mais tarde.');
        toast.error(err.message || 'Erro ao carregar produtos.'); 
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (productId, productName) => {
    if (!currentUser) {
      toast.error('Você precisa estar logado para adicionar produtos ao carrinho.');
      return;
    }

    try {
      await cartService.addProductToCart(productId, 1);
      toast.success(`"${productName}" adicionado ao carrinho!`);
    } catch (err) {
      toast.error(err.message || 'Erro ao adicionar produto ao carrinho.');
    }
  };

  if (loading) {
    return <div className="loading-message">Carregando produtos...</div>;
  }

  if (error) {
    return <div className="error-display">Erro: {error}</div>;
  }

  return (
    <div className="product-list-page container">
      <h2>Nossos Produtos</h2>
      {/* REMOVIDO: Bloco de mensagem de feedback local */}
      <div className="product-grid">
        {products.length > 0 ? (
          products.map(product => (
            <Link to={`/products/${product.id}`} key={product.id} className="product-card-link">
              <div className="product-card">
                <h3>{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <p className="product-price">Preço: R$ {product.price ? product.price.toFixed(2) : 'N/A'}</p>
                <p className="product-stock">Estoque: {product.stockQuantity}</p>
                <button
                  className="primary-button"
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAddToCart(product.id, product.name); }}
                  disabled={product.stockQuantity <= 0}
                >
                  {product.stockQuantity > 0 ? 'Adicionar ao Carrinho' : 'Sem Estoque'}
                </button>
              </div>
            </Link>
          ))
        ) : (
          <p className="no-products-message">Nenhum produto encontrado.</p>
        )}
      </div>
    </div>
  );
}

export default ProductListPage;