// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Footer from './components/Footer.js';
import Login from './components/Login.js';
import Dashboard from './components/Dashboard.js';
import ProductList from './components/ProductList.js';
import HomePage from './pages/HomePage.js';
import NotFoundPage from './pages/NotFoundPage.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Función para verificar si el usuario está autenticado
const isAuthenticated = () => {
  return localStorage.getItem('isAdmin') === 'true';
};

// Componente de ruta privada
const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="/autos" element={<ProductList />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
