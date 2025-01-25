// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client'; 
import App from './App';
import './styles/styles.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const root = ReactDOM.createRoot(document.getElementById('root')); // Cambia esta línea
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
