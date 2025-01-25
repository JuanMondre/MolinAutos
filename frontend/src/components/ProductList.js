import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

const AutosList = () => {
  const [autos, setAutos] = useState([]);

  useEffect(() => {
    const fetchAutos = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        if (response.ok) {
          const data = await response.json();
          setAutos(data);
        } else {
          console.error('Error al obtener autos:', response.statusText);
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    };

    fetchAutos();
  }, []);

  return (
    <div className="row">
      {autos.map((auto) => (
        <div key={auto._id} className="col-md-4">
          <ProductCard product={auto} />
        </div>
      ))}
    </div>
  );
};

export default AutosList;
