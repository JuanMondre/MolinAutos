import React from 'react';
import Footer from '../components/Footer';
import Location from '../components/Location';

const Contacto = () => {
  return (
    <>
      <main>
        <section className="contacto">
          <div className="container my-5">
            <h1 className="text-center mb-4">Contáctanos</h1>
            <Location />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Contacto;
