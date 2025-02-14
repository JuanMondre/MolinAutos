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
        </section>
        <ProductList />
      </main>
      <Footer />
    </>
  );
};

export default Autos;
