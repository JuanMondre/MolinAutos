import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminCatalogo = () => {
  const [autos, setAutos] = useState([]);
  const [editAuto, setEditAuto] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch('http://localhost:5000/api/products', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setAutos(data))
      .catch(error => console.error('Error al cargar autos:', error));
  }, []);

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
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/api/products/${editAuto._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editAuto)
      });

      if (response.ok) {
        setAutos(autos.map(a => (a._id === editAuto._id ? editAuto : a)));
        setEditAuto(null);
      }
    } catch (error) {
      console.error('Error al actualizar:', error);
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Catálogo de Autos</h1>

      {editAuto && (
        <div className="card p-3 mb-4">
          <h2>Editar Auto</h2>
          <form onSubmit={handleUpdate}>
            <input type="text" className="form-control mb-2" value={editAuto.marca} onChange={(e) => setEditAuto({ ...editAuto, marca: e.target.value })} placeholder="Marca" />
            <input type="text" className="form-control mb-2" value={editAuto.modelo} onChange={(e) => setEditAuto({ ...editAuto, modelo: e.target.value })} placeholder="Modelo" />
            <input type="text" className="form-control mb-2" value={editAuto.version} onChange={(e) => setEditAuto({ ...editAuto, version: e.target.value })} placeholder="Versión" />
            <input type="number" className="form-control mb-2" value={editAuto.anio} onChange={(e) => setEditAuto({ ...editAuto, anio: Number(e.target.value) })} placeholder="Año" />
            <input type="number" className="form-control mb-2" value={editAuto.km} onChange={(e) => setEditAuto({ ...editAuto, km: Number(e.target.value) })} placeholder="Kilómetros" />
            <input type="text" className="form-control mb-2" value={editAuto.motor} onChange={(e) => setEditAuto({ ...editAuto, motor: e.target.value })} placeholder="Motor" />
            <input type="text" className="form-control mb-2" value={editAuto.transmision} onChange={(e) => setEditAuto({ ...editAuto, transmision: e.target.value })} placeholder="Transmisión" />
            <input type="text" className="form-control mb-2" value={editAuto.rendimiento} onChange={(e) => setEditAuto({ ...editAuto, rendimiento: e.target.value })} placeholder="Rendimiento" />
            <input type="text" className="form-control mb-2" value={editAuto.caracteristicas} onChange={(e) => setEditAuto({ ...editAuto, caracteristicas: e.target.value })} placeholder="Características" />
            <select className="form-control mb-2" value={editAuto.estado} onChange={(e) => setEditAuto({ ...editAuto, estado: e.target.value })}>
              <option value="usado">Usado</option>
              <option value="nuevo">Nuevo</option>
            </select>
            <input type="text" className="form-control mb-2" value={editAuto.color} onChange={(e) => setEditAuto({ ...editAuto, color: e.target.value })} placeholder="Color" />
            <select className="form-control mb-2" value={editAuto.combustible} onChange={(e) => setEditAuto({ ...editAuto, combustible: e.target.value })}>
              <option value="nafta">Nafta</option>
              <option value="diesel">Diesel</option>
            </select>
            <input type="number" className="form-control mb-2" value={editAuto.precio} onChange={(e) => setEditAuto({ ...editAuto, precio: Number(e.target.value) })} placeholder="Precio" />
            <textarea className="form-control mb-2" value={editAuto.comentario} onChange={(e) => setEditAuto({ ...editAuto, comentario: e.target.value })} placeholder="Comentario"></textarea>
            <input type="text" className="form-control mb-2" value={editAuto.imagen} onChange={(e) => setEditAuto({ ...editAuto, imagen: e.target.value })} placeholder="Imagen (URL)" />
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
