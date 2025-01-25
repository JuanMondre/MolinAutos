// src/components/ProductCard.js
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap'; // Asegúrate de importar correctamente

const ProductCard = ({ product }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const { marca, modelo, version, motor, transmision, rendimiento, caracteristicas, precio, comentario, imagen } = product;

  return (
    <div className="card shadow-sm mb-4">
      <img 
        src={imagen || "https://via.placeholder.com/300"} 
        alt={`${marca} ${modelo}`} 
        className="card-img-top" 
        style={{ height: '250px', objectFit: 'cover' }} 
      />
      <div className="card-body">
        <h2 className="card-title">{marca} {modelo} {version && `- ${version}`}</h2>
        <p className="card-text">{comentario}</p>
        <ul className="list-unstyled">
          <li><strong>Motor:</strong> {motor}</li>
          <li><strong>Transmisión:</strong> {transmision}</li>
          <li><strong>Rendimiento:</strong> {rendimiento}</li>
          <li><strong>Características:</strong> {caracteristicas}</li>
        </ul>
        <p><strong>Precio:</strong> ${precio}</p>
        <Button variant="primary" onClick={handleShow}>Ver detalles</Button>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{marca} {modelo} - Detalles</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={imagen} alt={modelo} style={{ width: '100%', height: 'auto' }} />
          <ul>
            <li><strong>Motor:</strong> {motor}</li>
            <li><strong>Transmisión:</strong> {transmision}</li>
            <li><strong>Rendimiento:</strong> {rendimiento}</li>
            <li><strong>Características:</strong> {caracteristicas}</li>
            <li><strong>Precio:</strong> ${precio}</li>
            <li><strong>Comentario:</strong> {comentario}</li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductCard;
