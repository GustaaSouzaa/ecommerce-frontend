import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from './components/Layout';
import ProductListPage from './pages/ProductListPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AdminProductPage from './pages/AdminProductPage';

import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';

import './App.css';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductListPage />} /> {/* Lista de produtos continua pública */}
              <Route path="/products/:id" element={<ProtectedRoute element={ProductDetailPage} />} /> {/* Detalhes do produto protegida */}

              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              <Route path="/cart" element={<ProtectedRoute element={CartPage} />} />
              <Route path="/order-history" element={<ProtectedRoute element={OrderHistoryPage} />} />

              {/* Rota da Página de Administração - Protegida */}
              <Route path="/admin/products" element={<ProtectedRoute element={AdminProductPage} />} /> {/* <<< NOVA ROTA PROTEGIDA */}

            </Routes>
          </Layout>
        </AuthProvider>
      </ThemeProvider>
      <ToastContainer />
    </Router>
  );
}

export default App;