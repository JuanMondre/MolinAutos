import React, { useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
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
    imagenes: [],
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      setFormData((prev) => ({
        ...prev,
        imagenes: [...prev.imagenes, ...Array.from(files)], // Agrega las nuevas imágenes al array
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      setAlert({ message: 'Por favor, inicia sesión para agregar un auto.', type: 'danger' });
      return;
    }

    if (isNaN(formData.anio) || isNaN(formData.km) || isNaN(formData.precio)) {
      setAlert({ message: 'Por favor, ingresa valores numéricos válidos en los campos "Año", "Kilómetros" y "Precio".', type: 'danger' });
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (['anio', 'km', 'precio'].includes(key)) {
        data.append(key, parseFloat(formData[key]));
      } else if (key === 'imagenes' && formData.imagenes.length > 0) {
        formData.imagenes.forEach((img) => data.append('imagenes', img)); // Agrega todas las imágenes
      } else {
        data.append(key, formData[key]);
      }
    });

    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: data,
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
          imagenes: [],
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
      <h1 className="text-center mb-4">Agregar Auto al Catálogo</h1>
      <button type="button" className="btn btn-primary" onClick={() => navigate('/catalogo')}>
        Ver Catálogo de Autos
      </button>

      <button className="btn btn-danger" style={{ marginLeft: "50%" }} onClick={logout}>Cerrar sesión</button>


      <form onSubmit={handleSubmit}>
        {['marca', 'modelo', 'version', 'anio', 'km', 'motor', 'transmision', 'rendimiento', 'color', 'precio'].map((field) => (
          <div className="mb-3" key={field}>
            <label htmlFor={field} className="form-label d-block fw-bold">
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
          <label htmlFor="estado" className="form-label d-block fw-bold">Estado</label>
          <select id="estado" name="estado" className="form-select" value={formData.estado} onChange={handleChange}>
            <option value="usado">Usado</option>
            <option value="nuevo">Nuevo</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="combustible" className="form-label d-block fw-bold">Combustible</label>
          <select id="combustible" name="combustible" className="form-select" value={formData.combustible} onChange={handleChange} required>
            <option value="">Seleccionar</option>
            <option value="nafta">Nafta</option>
            <option value="diesel">Diesel</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="caracteristicas" className="form-label d-block fw-bold">Equipamiento</label>
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
          <label htmlFor="comentario" className="form-label d-block fw-bold">Comentario</label>
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
          <label htmlFor="imagen" className="form-label d-block fw-bold">Subir Imagen</label>
          <input
            type="file"
            id="imagenes"
            name="imagenes"
            className="form-control"
            onChange={handleChange}
            accept="image/*"
            multiple
          />
        </div>

        {formData.imagenes.length > 0 && (
          <div className="mb-3 d-flex flex-wrap">
            {formData.imagenes.map((img, index) => (
              <div key={index} className="me-2">
                <img src={URL.createObjectURL(img)} alt={`Vista previa ${index}`} className="img-thumbnail" width="100" />
              </div>
            ))}
          </div>
        )}

        {alert.message && (
          <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
            {alert.message}
            <button type="button" className="btn-close" onClick={() => setAlert({ message: '', type: '' })}></button>
          </div>
        )}
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">Agregar Auto</button>
        </div>
      </form>
    </div>
  );
};

export default Dashboard;
