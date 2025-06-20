import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import '../styles/ProductForm.css'; // Importa o CSS específico para o formulário

function ProductForm({ product, onSave, onCancel }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');

  // Preenche o formulário se um produto for passado (para edição)
  useEffect(() => {
    if (product) {
      setName(product.name || '');
      setDescription(product.description || '');
      setPrice(product.price || '');
      setStockQuantity(product.stockQuantity || '');
    } else { // Limpa o formulário para criação
      setName('');
      setDescription('');
      setPrice('');
      setStockQuantity('');
    }
  }, [product]); // Re-executa se o produto a ser editado mudar

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validação básica no front-end (complementa a do backend)
    if (!name || !description || !price || !stockQuantity) {
      toast.error('Todos os campos são obrigatórios.');
      return;
    }
    if (isNaN(price) || parseFloat(price) <= 0) { // Usar parseFloat para comparar corretamente
      toast.error('Preço deve ser um número positivo.');
      return;
    }
    if (isNaN(stockQuantity) || parseInt(stockQuantity) < 0) { // Usar parseInt para comparar corretamente
      toast.error('Estoque deve ser um número não negativo.');
      return;
    }

    const productData = {
      id: product ? product.id : null, // Inclui o ID se for edição
      name,
      description,
      price: parseFloat(price), // Converte para número decimal
      stockQuantity: parseInt(stockQuantity), // Converte para inteiro
    };

    onSave(productData); // Chama a função onSave passada via props (de AdminProductPage)
  };

  return (
    <div className="product-form-container">
      <h3>{product ? 'Editar Produto' : 'Criar Novo Produto'}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nome:</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="description">Descrição:</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="price">Preço:</label>
          <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} step="0.01" required />
        </div>
        <div className="form-group">
          <label htmlFor="stockQuantity">Estoque:</label>
          <input type="number" id="stockQuantity" value={stockQuantity} onChange={(e) => setStockQuantity(e.target.value)} required />
        </div>
        <div className="form-actions">
          <button type="submit" className="primary-button">Salvar</button>
          <button type="button" onClick={onCancel} className="secondary-button">Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;