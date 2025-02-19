import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const AdminCatalogo = () => {
  const { logout } = useAuth();
  const [autos, setAutos] = useState([]);
  const [editAuto, setEditAuto] = useState(null);
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  

  useEffect(() => {
    fetch('http://localhost:5000/api/products', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setAutos(data))
      .catch(error => console.error('Error al cargar autos:', error));
  }, [token]);

  const validateForm = () => {
    const requiredFields = [
      "marca", "modelo", "version", "anio", "km", "motor", "transmision",
      "rendimiento", "caracteristicas", "estado", "color", "combustible",
      "precio", "comentario"
    ];

    const newErrors = requiredFields.reduce((acc, field) => {
      if (!editAuto[field] || String(editAuto[field]).trim() === "") {
        acc[field] = "Asegurese de que ningun campo quede vacio";
      }
      return acc;
    }, {});

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que quieres eliminar este auto?')) return;

    try {
      await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setAutos(autos.filter(auto => auto._id !== id));
    } catch (error) {
      console.error('Error al eliminar:', error);
    }
  };

  const handleEdit = (auto) => {
    setEditAuto(auto);
    setErrors({}); // Reiniciar errores al editar
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // No continuar si hay errores de validación
    }

    const formData = new FormData();
    Object.keys(editAuto).forEach(key => {
      formData.append(key, editAuto[key]);
    });
    if (file) {
      formData.append('imagen', file);
    }

    try {
      const response = await fetch(`http://localhost:5000/api/products/${editAuto._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData // Cambié a formData para incluir archivos
      });

      if (response.ok) {
        setAutos(autos.map(a => (a._id === editAuto._id ? editAuto : a)));
        setEditAuto(null);
        setFile(null);
        setErrors({}); // Reiniciar errores al actualizar
      }
    } catch (error) {
      console.error('Error al actualizar:', error);
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Catálogo de Autos</h1>
      <button type="button" className="btn btn-primary" onClick={() => navigate('/dashboard')}>
        Agregar autos
      </button>

      <button className="btn btn-danger" style={{ marginLeft: "50%" }} onClick={logout}>
        Cerrar Sesión
      </button>

      {editAuto && (
        <div className="card p-3 mb-4">
          <h2>Editar Auto</h2>
          <form onSubmit={handleUpdate}>
            {Object.keys(errors).map((key) => (
              <div key={key} className="text-danger">{errors[key]}</div>
            ))}

            <label>Marca</label>
            <input type="text" className="form-control mb-2" value={editAuto.marca} onChange={(e) => setEditAuto({ ...editAuto, marca: e.target.value })} />

            <label>Modelo</label>
            <input type="text" className="form-control mb-2" value={editAuto.modelo} onChange={(e) => setEditAuto({ ...editAuto, modelo: e.target.value })} />

            <label>Versión</label>
            <input type="text" className="form-control mb-2" value={editAuto.version} onChange={(e) => setEditAuto({ ...editAuto, version: e.target.value })} />

            <label>Año</label>
            <input type="number" className="form-control mb-2" value={editAuto.anio} onChange={(e) => setEditAuto({ ...editAuto, anio: Number(e.target.value) })} />

            <label>Kilómetros</label>
            <input type="number" className="form-control mb-2" value={editAuto.km} onChange={(e) => setEditAuto({ ...editAuto, km: Number(e.target.value) })} />

            <label>Motor</label>
            <input type="text" className="form-control mb-2" value={editAuto.motor} onChange={(e) => setEditAuto({ ...editAuto, motor: e.target.value })} />

            <label>Transmisión</label>
            <input type="text" className="form-control mb-2" value={editAuto.transmision} onChange={(e) => setEditAuto({ ...editAuto, transmision: e.target.value })} />

            <label>Rendimiento</label>
            <input type="text" className="form-control mb-2" value={editAuto.rendimiento} onChange={(e) => setEditAuto({ ...editAuto, rendimiento: e.target.value })} />

            <label>Características</label>
            <input type="text" className="form-control mb-2" value={editAuto.caracteristicas} onChange={(e) => setEditAuto({ ...editAuto, caracteristicas: e.target.value })} />

            <label>Estado</label>
            <select className="form-control mb-2" value={editAuto.estado} onChange={(e) => setEditAuto({ ...editAuto, estado: e.target.value })}>
              <option value="usado">Usado</option>
              <option value="nuevo">Nuevo</option>
            </select>

            <label>Color</label>
            <input type="text" className="form-control mb-2" value={editAuto.color} onChange={(e) => setEditAuto({ ...editAuto, color: e.target.value })} />

            <label>Combustible</label>
            <select className="form-control mb-2" value={editAuto.combustible} onChange={(e) => setEditAuto({ ...editAuto, combustible: e.target.value })}>
              <option value="nafta">Nafta</option>
              <option value="diesel">Diesel</option>
            </select>

            <label>Precio</label>
            <input type="number" className="form-control mb-2" value={editAuto.precio} onChange={(e) => setEditAuto({ ...editAuto, precio: Number(e.target.value) })} />

            <label>Comentario</label>
            <textarea className="form-control mb-2" value={editAuto.comentario} onChange={(e) => setEditAuto({ ...editAuto, comentario: e.target.value })}></textarea>

            <label>Imagen</label>
            <input type="file" className="form-control mb-2" onChange={(e) => setFile(e.target.files[0])} accept="image/*" />

            <button type="submit" className="btn btn-success me-2">Guardar</button>
            <button type="button" className="btn btn-danger" onClick={() => setEditAuto(null)}>Cancelar</button>
          </form>
        </div>
      )}

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Año</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {autos.map((auto) => (
            <tr key={auto._id}>
              <td>{auto.marca}</td>
              <td>{auto.modelo}</td>
              <td>{auto.anio}</td>
              <td>${auto.precio}</td>
              <td>
                <button className="btn btn-warning me-2" onClick={() => handleEdit(auto)}>Editar</button>
                <button className="btn btn-danger" onClick={() => handleDelete(auto._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCatalogo;
