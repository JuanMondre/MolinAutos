import React, { useState } from 'react';
import { Modal, Button, Carousel } from 'react-bootstrap';

const ProductCard = ({ product }) => {
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const { marca, modelo, version, anio, rendimiento, combustible, km, caracteristicas, comentario, imagen } = product;
  const imageUrl = imagen?.length > 0 
  ? `http://localhost:5000/public/${imagen[0]}` 
  : 'https://via.placeholder.com/200'; // Imagen por defecto si no hay imágenes

  const whatsappNumber = "5492645851326";
  const whatsappMessage = `Hola, estoy interesado en el ${marca} ${modelo} ${version ? `- ${version}` : ''}. ¿Podrías decirme el precio?`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="card shadow-sm mb-4">
        <img 
          src={imageUrl} 
          alt={`${marca} ${modelo}`} 
          className="card-img-top" 
          style={{ height: '200px', objectFit: 'cover' }} 
        />
      <div className="card-body">
        <h2 className="card-title">{marca} {modelo} {version && `- ${version}`}</h2>
        <ul className="list-unstyled">
          <li><strong>Año:</strong> {anio}</li>
          <li><strong>Kilometraje:</strong> {km}km</li>
          <li><strong>Rendimiento:</strong> {rendimiento} - {combustible}</li>
        </ul>
        <Button variant="primary" onClick={handleShow} className="me-2">Ver detalles</Button>
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-success">Consultar Precio</a>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{marca} {modelo} - Detalles</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {imagen?.length > 0 ? (
            <Carousel>
              {imagen.map((img, index) => (
                <Carousel.Item key={index}>
                  <img 
                    src={`http://localhost:5000/public/${img}`} 
                    alt={`${modelo} ${index + 1}`} 
                    style={{ width: '100%', height: 'auto' }} 
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          ) : (
            <p>No hay imágenes disponibles</p>
          )}
          <ul>
            <li><strong>Equipamiento:</strong> {caracteristicas}</li>
            <li><strong>Comentario:</strong> {comentario}</li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductCard;
