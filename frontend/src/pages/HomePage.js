import React from 'react';
import Navbar from '../components/Navbar.js';
import Carousel from '../components/Carousel.js';
import AboutUs from '../components/AboutUs.js';
import Footer from '../components/Footer.js';
import Location from '../components/Location.js';

const Home = () => {
  return (
    <>
      <Navbar />
      <main>
        <Carousel />
        <section className="titulo">
          <div className="container my-5">
            <h1 className="text-center mb-4">Bienvenidos a MolinAutos</h1>
          </div>
        </section>
        <section className="actions">
          <div className="container my-5">
            <div className="row justify-content-center">
              <div className="col-md-8">
                <div className="d-flex flex-wrap justify-content-center gap-3">
                  <a href="/autos" className="btn btn-dark btn-lg">Busca tu vehículo</a>
                  <a href="#" className="btn btn-dark btn-lg">Pedí tu vehículo</a>
                  <a href="#" className="btn btn-dark btn-lg">Cotiza tu vehículo</a>
                  <a href="#" className="btn btn-dark btn-lg">Consignaciones</a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <AboutUs />
        <Location />
      </main>
      <Footer />
    </>
  );
};

export default Home;
