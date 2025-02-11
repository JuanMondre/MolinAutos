import React, { useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import AdminCatalogo from './AdminCatalogo.js'; 

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [showCatalog, setShowCatalog] = useState(false);
  const [alert, setAlert] = useState({ message: '', type: '' });

  const [formData, setFormData] = useState({
    marca: '',
    modelo: '',
    version: '',
    anio: '',
    km: '',
    motor: '',
    transmision: '',
    rendimiento: '',
    caracteristicas: '',
    estado: 'usado',
    color: '',
    combustible: '',
    precio: '',
    comentario: '',
    imagen: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setAlert({ message: 'Auto agregado con éxito', type: 'success' });
        setFormData({
          marca: '',
          modelo: '',
          version: '',
          anio: '',
          km: '',
          motor: '',
          transmision: '',
          rendimiento: '',
          caracteristicas: '',
          estado: 'usado',
          color: '',
          combustible: '',
          precio: '',
          comentario: '',
          imagen: '',
        });
      } else {
        const errorData = await response.json();
        setAlert({ message: `Error: ${errorData.message}`, type: 'danger' });
      }
    } catch (error) {
      setAlert({ message: 'Error en la solicitud', type: 'danger' });
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">
        {showCatalog ? 'Catálogo de Autos' : 'Agregar Auto al Catálogo'}
      </h1>

      {alert.message && (
        <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
          {alert.message}
          <button type="button" className="btn-close" onClick={() => setAlert({ message: '', type: '' })}></button>
        </div>
      )}

      {/* Alternar entre Formulario y Catálogo */}
      <div className="d-flex justify-content-between mb-4">
        <button className="btn btn-info" onClick={() => setShowCatalog(!showCatalog)}>
          {showCatalog ? 'Agregar Auto' : 'Ver Catálogo'}
        </button>
        <button className="btn btn-danger" onClick={logout}>Cerrar sesión</button>
      </div>

      {showCatalog ? (
        <AdminCatalogo />
      ) : (
        <form onSubmit={handleSubmit}>
          {['marca', 'modelo', 'version', 'anio', 'km', 'motor', 'transmision', 'rendimiento', 'color', 'precio'].map((field) => (
            <div className="mb-3" key={field}>
              <label htmlFor={field} className="form-label">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field === 'anio' || field === 'km' || field === 'precio' ? 'number' : 'text'}
                id={field}
                name={field}
                className="form-control"
                value={formData[field]}
                onChange={handleChange}
                required={field !== 'version'}
              />
            </div>
          ))}

          <div className="mb-3">
            <label htmlFor="estado" className="form-label">Estado</label>
            <select id="estado" name="estado" className="form-select" value={formData.estado} onChange={handleChange}>
              <option value="usado">Usado</option>
              <option value="nuevo">Nuevo</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="combustible" className="form-label">Combustible</label>
            <select id="combustible" name="combustible" className="form-select" value={formData.combustible} onChange={handleChange} required>
              <option value="">Seleccionar</option>
              <option value="nafta">Nafta</option>
              <option value="diesel">Diesel</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="caracteristicas" className="form-label">Características</label>
            <textarea
              id="caracteristicas"
              name="caracteristicas"
              className="form-control"
              value={formData.caracteristicas}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="comentario" className="form-label">Comentario</label>
            <textarea
              id="comentario"
              name="comentario"
              className="form-control"
              value={formData.comentario}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="imagen" className="form-label">Imagen (URL)</label>
            <input
              type="url"
              id="imagen"
              name="imagen"
              className="form-control"
              value={formData.imagen}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Agregar Auto</button>
        </form>
      )}
    </div>
  );
};

export default Dashboard;
