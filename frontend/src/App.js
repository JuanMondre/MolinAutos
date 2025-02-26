import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthProvider';
import Footer from './components/Footer.js';
import Login from './components/Login.js';
import Dashboard from './components/Dashboard.js';
import AdminCatalogo from './components/AdminCatalogo.js';
import ProductList from './components/ProductList.js';
import HomePage from './pages/HomePage.js';
import Busqueda from './pages/BusquedaPage.js'
import Contacto from './pages/Contacto.js';
import Navbar from './components/Navbar.js';
import NotFoundPage from './pages/NotFoundPage.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Componente de ruta privada
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <AuthProvider>
    <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/busqueda' element={<Busqueda/>} />
          <Route path='/contacto' element={<Contacto/>} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="/catalogo" element={<AdminCatalogo />} />
          <Route path="/autos" element={<ProductList />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </AuthProvider>
  );
};

export default App;
