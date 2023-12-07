//const response = await fetch(`http://localhost:5005/paradero/${codigoParadero}`);

import React, { useState } from 'react';
import './ParaderoForm.css';

const ParaderoForm = () => {
  const [codigoParadero, setCodigoParadero] = useState('');
  const [paraderoInfo, setParaderoInfo] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5005/paradero/${codigoParadero}`);
      if (response.ok) {
        const data = await response.json();
        sortBuses(data);
        setParaderoInfo(data);
        setError(null);
      } else {
        setError('Error al obtener información del paradero');
        setParaderoInfo(null);
      }
    } catch (error) {
      setError('Error interno del servidor');
      setParaderoInfo(null);
    }
  };

  const sortBuses = (data) => {
    data.services.forEach(service => {
      service.buses.sort((a, b) => a.max_arrival_time - b.max_arrival_time);
    });
  };

  return (
    <div className="container">
       <div className="form-container">
          <form onSubmit={handleSubmit} className="form">
            <input
              type="text"
              value={codigoParadero}
              onChange={(e) => setCodigoParadero(e.target.value)}
            />
            <button type="submit">Obtener información</button>
          </form>
          {error && <p>{error}</p>}
          {paraderoInfo && (
            <div>
              <h3>Información del Paradero:</h3>
              <p>ID del Paradero: {paraderoInfo.id}</p>
              <p>Nombre del Paradero: {paraderoInfo.name}</p>
              <h4>Servicios:</h4>
              <ul>
                {paraderoInfo.services.flatMap(service =>
                  service.buses.map(bus => (
                    <li key={bus.id}>
                      <strong>ID del Servicio: {service.id}</strong><br />
                      Distancia: {bus.meters_distance} metros<br />
                      Tiempo de Llegada: entre {bus.min_arrival_time} y {bus.max_arrival_time} minutos<br />
                    </li>
                  ))
                )}
              </ul>
            </div>
          )}
      </div>
    </div>
  );
};

export default ParaderoForm;
