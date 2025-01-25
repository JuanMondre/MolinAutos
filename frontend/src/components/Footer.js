import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-dark text-white py-4">
            <div className="container">
                <div className="row">
                    <div className="col-md-4 mb-3 mb-md-0">
                        <h3>Contacto</h3>
                        <ul className="list-unstyled">
                            <li><a href="https://wa.me/5492645051543" className="text-white"><i className="fab fa-whatsapp"></i> WhatsApp</a></li>
                            <li><a href="mailto:ventas@molinautos.com" className="text-white"><i className="far fa-envelope"></i> Email</a></li>
                            <li><a href="tel:+5492645051543" className="text-white"><i className="fas fa-phone"></i> +54 9 2645 051543</a></li>
                        </ul>
                    </div>
                    <div className="col-md-4 mb-3 mb-md-0">
                        <h3>Sobre nosotros</h3>
                        <p>Más de 20 años en el sector, ofreciendo la mejor calidad y servicio.</p>
                    </div>
                    <div className="col-md-4 mb-3 mb-md-0">
                        <h3>Síguenos</h3>
                        <a href="https://www.facebook.com/molinautos" className="text-white"><i className="fab fa-facebook"></i></a>
                        <a href="https://www.instagram.com/molinautos" className="text-white"><i className="fab fa-instagram"></i></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
