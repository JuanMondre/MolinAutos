import React from 'react';

const AboutUs = () => {
    return (
        <section className="about-us">
            <div className="container my-5">
                <div className="card">
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src="img/images (1).gif" className="img-fluid rounded-start" alt="Animación de MolinAutos" />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h2 className="card-title">Tu concesionario de confianza</h2>
                                <p className="card-text">En MolinAutos, nos enorgullece ofrecer una amplia gama de vehículos de alta calidad y un servicio excepcional a nuestros clientes. Con más de 20 años de experiencia en el mercado automotriz, nos hemos convertido en líderes en la venta y mantenimiento de automóviles en la región.</p>
                                <p className="card-text">Nuestro compromiso es proporcionar a nuestros clientes una experiencia de compra sin igual, con asesoramiento personalizado, financiamiento flexible y un servicio postventa de primera clase. En MolinAutos, no solo vendemos autos, creamos relaciones duraderas con nuestros clientes.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;

