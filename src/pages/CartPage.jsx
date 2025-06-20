import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import cartService from '../services/cartService';
import orderService from '../services/orderService';
import authService from '../services/authService';
import { toast } from 'react-toastify'; 
import '../styles/CartPage.css';

function CartPage() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  const navigate = useNavigate();

  const currentUsername = authService.getCurrentUser()?.username;

  const fetchCart = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (!currentUsername) {
      setError('Você precisa estar logado para ver seu carrinho.');
      setLoading(false);
      return;
    }

    try {
      const data = await cartService.getCart();
      setCart(data);
    } catch (err) {
      setError(err.message || 'Erro ao carregar carrinho.');
      toast.error(err.message || 'Erro ao carregar carrinho.');
    } finally {
      setLoading(false);
    }
  }, [currentUsername]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleRemoveItem = async (productId, productName) => {
    try {
      const updatedCart = await cartService.removeProductFromCart(productId);
      setCart(updatedCart);
      toast.success(`"${productName}" removido do carrinho.`);
    } catch (err) {
      toast.error(err.message || 'Erro ao remover item do carrinho.');
    }
  };

  const handleClearCart = async () => {
    try {
      await cartService.clearCart();
      setCart({ ...cart, items: [], totalAmount: 0 });
      toast.success('Carrinho esvaziado com sucesso!');
    } catch (err) {
      toast.error(err.message || 'Erro ao esvaziar o carrinho.');
    }
  };

  const handleCheckout = async () => {
    if (!cart || cart.items.length === 0) {
      toast.error('Seu carrinho está vazio. Adicione produtos antes de finalizar.');
      return;
    }
    try {
      const orderResponse = await orderService.createOrderFromCart();
      toast.success(`Pedido #${orderResponse.id} finalizado com sucesso!`);
      setCart({ ...cart, items: [], totalAmount: 0 });

      setTimeout(() => {
        navigate('/order-history');
      }, 1500);

    } catch (err) {
      toast.error(err.message || 'Erro ao finalizar pedido.');
    }
  };

  if (loading) {
    return <div className="loading-message">Carregando carrinho...</div>;
  }

  if (error) {
    return <div className="error-display">Erro: {error}</div>;
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="cart-page container">
        <h2>Seu Carrinho</h2>
        {/* REMOVIDO: Bloco de mensagem de feedback local */}
        <p className="empty-cart-message">Seu carrinho está vazio.</p>
        <button className="primary-button" onClick={() => navigate('/products')}>Continuar Comprando</button>
      </div>
    );
  }

  return (
    <div className="cart-page container">
      <h2>Seu Carrinho</h2>
      {/* REMOVIDO: Bloco de mensagem de feedback local */}
      <div className="cart-items-list">
        {cart.items.map(item => (
          <div key={item.id} className="cart-item-card">
            <div className="item-details">
              <h3>{item.productName}</h3>
              <p>Preço Unitário: R$ {item.productPrice ? item.productPrice.toFixed(2) : 'N/A'}</p>
              <p>Quantidade: {item.quantity}</p>
              <p className="item-subtotal">Subtotal: R$ {item.subtotal ? item.subtotal.toFixed(2) : 'N/A'}</p>
            </div>
            <button
              className="secondary-button"
              onClick={() => handleRemoveItem(item.productId, item.productName)}
            >
              Remover
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h3>Total do Carrinho: R$ {cart.totalAmount ? cart.totalAmount.toFixed(2) : '0.00'}</h3>
        <div className="cart-actions">
          <button className="primary-button" onClick={handleCheckout}>Finalizar Pedido</button>
          <button className="secondary-button" onClick={handleClearCart}>Esvaziar Carrinho</button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;