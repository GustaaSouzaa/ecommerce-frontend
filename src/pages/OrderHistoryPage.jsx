import React, { useEffect, useState, useCallback } from 'react';
import orderService from '../services/orderService';
import authService from '../services/authService';
import { toast } from 'react-toastify'; 
import '../styles/OrderHistoryPage.css';

function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentUsername = authService.getCurrentUser()?.username;

  const fetchOrderHistory = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (!currentUsername) {
      setError('Você precisa estar logado para ver seu histórico de pedidos.');
      setLoading(false);
      return;
    }

    try {
      const data = await orderService.getOrderHistory();
      setOrders(data);
    } catch (err) {
      setError(err.message || 'Erro ao carregar histórico de pedidos.');
      toast.error(err.message || 'Erro ao carregar histórico de pedidos.'); 
    } finally {
      setLoading(false);
    }
  }, [currentUsername]);

  useEffect(() => {
    fetchOrderHistory();
  }, [fetchOrderHistory]);

  if (loading) {
    return <div className="loading-message">Carregando histórico de pedidos...</div>;
  }

  if (error) {
    return <div className="error-display">Erro: {error}</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="order-history-page container">
        <h2>Seu Histórico de Pedidos</h2>
        <p className="no-orders-message">Você ainda não fez nenhum pedido.</p>
      </div>
    );
  }

  return (
    <div className="order-history-page container">
      <h2>Seu Histórico de Pedidos</h2>
      <div className="orders-list">
        {orders.map(order => (
          <div key={order.id} className="order-card">
            <h3>Pedido #{order.id}</h3>
            <p>Data: {new Date(order.orderDate).toLocaleString()}</p>
            <p className="order-total">Total: R$ {order.totalAmount ? order.totalAmount.toFixed(2) : '0.00'}</p>

            <h4>Itens do Pedido:</h4>
            <ul className="order-items-list">
              {order.items.map(item => (
                <li key={item.id} className="order-item-detail">
                 <span>{item.productName} ({item.quantity}x)</span>
                 <span>R$ {item.priceAtPurchase ? item.priceAtPurchase.toFixed(2) : 'N/A'} (Subtotal: R$ {item.subtotal ? item.subtotal.toFixed(2) : 'N/A'})</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderHistoryPage;