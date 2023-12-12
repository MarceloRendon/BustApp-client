import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';

const metersToKilometers = (meters) => {
  return (meters / 1000).toFixed(2); // Convertir a kilómetros y redondear a dos decimales
};

const ParaderoForm = () => {
  const [codigoParadero, setCodigoParadero] = useState('');
  const [busData, setBusData] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:5005/paradero/${codigoParadero}`);
      const data = await response.json();
      const buses = data.services.flatMap(service =>
        service.buses.map(bus => ({ ...bus, serviceId: service.id }))
      );
      setBusData(buses); // Extrayendo buses con ID de servicio
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="paradero-form">
      <input
        type="text"
        placeholder="Enter Paradero Code"
        value={codigoParadero}
        onChange={(e) => setCodigoParadero(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <List sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
        {busData.map((bus, index) => (
          <React.Fragment key={index}>
            <ListItem alignItems="flex-start">
              <div style={{ marginRight: '16px', fontWeight: 'bold' }}>
                {bus.serviceId}
              </div>
              <ListItemText
                primary={`Tiempo de Llegada: entre ${bus.min_arrival_time} y ${bus.max_arrival_time} min.`}
                secondary={`Distancia: ${bus.meters_distance} metros / ${metersToKilometers(
                  bus.meters_distance
                )} kilómetros`}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
};

export default ParaderoForm;
