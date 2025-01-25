import React from 'react';

const Carousel = () => {
  return (
    <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-indicators">
        <button 
          type="button" 
          data-bs-target="#carouselExampleCaptions" 
          data-bs-slide-to="0" 
          className="active" 
          aria-current="true" 
          aria-label="Slide 1">
        </button>
        <button 
          type="button" 
          data-bs-target="#carouselExampleCaptions" 
          data-bs-slide-to="1" 
          aria-label="Slide 2">
        </button>
        <button 
          type="button" 
          data-bs-target="#carouselExampleCaptions" 
          data-bs-slide-to="2" 
          aria-label="Slide 3">
        </button>
        <button 
          type="button" 
          data-bs-target="#carouselExampleCaptions" 
          data-bs-slide-to="3" 
          aria-label="Slide 4">
        </button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="img/frente1.jpg" className="d-block w-100" alt="Frente de auto 1" />
          <div className="carousel-caption">
            <h2>Nuestros mejores modelos</h2>
            <p>Descubre nuestra selección de autos.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img src="img/frente2.jpg" className="d-block w-100" alt="Frente de auto 2" />
          <div className="carousel-caption">
            <h2>Ofertas especiales</h2>
            <p>Aprovecha nuestras promociones del mes.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img src="img/exterior1.jpg" className="d-block w-100" alt="Exterior de auto 1" />
          <div className="carousel-caption">
            <h2>Servicio de calidad</h2>
            <p>Nuestro equipo está listo para atenderte.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img src="img/exterior2.jpg" className="d-block w-100" alt="Exterior de auto 2" />
          <div className="carousel-caption">
            <h2>Cotizaciones</h2>
            <p>Nuestro equipo está listo para atenderte.</p>
          </div>
        </div>
      </div>
      <button 
        className="carousel-control-prev" 
        type="button" 
        data-bs-target="#carouselExampleCaptions" 
        data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Anterior</span>
      </button>
      <button 
        className="carousel-control-next" 
        type="button" 
        data-bs-target="#carouselExampleCaptions" 
        data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Siguiente</span>
      </button>
    </div>
  );
};

export default Carousel;
