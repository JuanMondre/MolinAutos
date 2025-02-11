// src/pages/Autos.js

import React from 'react';
import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';
import ProductList from '../components/ProductList.js'; 

const Autos = () => {
  return (
    <>
      <Navbar />
      <main>
        <section className="titulo">
          <div className="container my-5">
            <h1 className="text-center mb-4">Nuestros Autos</h1>
          </div>
        </section>
        <ProductList />
      </main>
      <Footer />
    </>
  );
};

export default Autos;
