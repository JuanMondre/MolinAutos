import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Busqueda = () => {
  return (
    <>
      <Navbar />
      <main>
        <section className="titulo">
          <div className="container my-5">
            <h1 className="text-center mb-4">Búsquedas</h1>
          </div>
        </section>
        <section className="busqueda">
          <div className="container my-5">
            <p className="text-center">Aquí se realizarán las búsquedas de vehículos.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Busqueda;
