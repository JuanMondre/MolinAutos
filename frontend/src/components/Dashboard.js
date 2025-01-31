import React, { useState } from 'react';
import { useAuth } from '../context/AuthProvider';

const Dashboard = () => {
  const { logout } = useAuth();

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

    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Auto agregado:', formData);
        // Limpiar el formulario
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
        console.error('Error al agregar auto:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Agregar Auto al Catálogo</h1>
      <form onSubmit={handleSubmit}>
        {/** Campos del formulario **/}
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
        <button className="btn btn-danger mt-3" onClick={logout}>
        Cerrar sesión
        </button>
        <button type="submit" className="btn btn-primary">Agregar Auto</button>
      </form>
    </div>
  );
};

export default Dashboard;

