import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import productService from '../services/productService';
import cartService from '../services/cartService';
import authService from '../services/authService';
import { toast } from 'react-toastify'; 
import '../styles/ProductDetailPage.css';

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentUser = authService.getCurrentUser();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await productService.getProductById(id);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Erro ao carregar detalhes do produto.');
        toast.error(err.message || 'Erro ao carregar detalhes do produto.');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!currentUser) {
      toast.error('Você precisa estar logado para adicionar produtos ao carrinho.');
      return;
    }
    if (!product) return; // Garante que há um produto carregado

    try {
      await cartService.addProductToCart(product.id, 1); // Adiciona 1 unidade
      toast.success(`"${product.name}" adicionado ao carrinho!`);
    } catch (err) {
      toast.error(err.message || 'Erro ao adicionar produto ao carrinho.');
    }
  };

  if (loading) {
    return <div className="loading-message">Carregando detalhes do produto...</div>;
  }

  if (error) {
    return <div className="error-display">Erro: {error}</div>;
  }

  if (!product) {
    return <div className="no-product-found">Produto não encontrado.</div>;
  }

  return (
    <div className="product-detail-page container">
      <div className="product-detail-card">
        <h2 className="product-detail-name">{product.name}</h2>
        <p className="product-detail-description">{product.description}</p>
        <p className="product-detail-price">Preço: R$ {product.price ? product.price.toFixed(2) : 'N/A'}</p>
        <p className="product-detail-stock">Estoque: {product.stockQuantity}</p>
        <button
          className="primary-button"
          onClick={handleAddToCart}
          disabled={product.stockQuantity <= 0}
        >
          {product.stockQuantity > 0 ? 'Adicionar ao Carrinho' : 'Sem Estoque'}
        </button>
      </div>
    </div>
  );
}

export default ProductDetailPage;