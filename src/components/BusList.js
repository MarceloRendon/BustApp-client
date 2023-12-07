import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

const metersToKilometers = (meters) => {
    return (meters / 1000).toFixed(2); // Convertir a kilómetros y redondear a dos decimales
  };

const BusList = ({ paraderoInfo }) => {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {paraderoInfo.services.flatMap(service =>
        service.buses.map(bus => (
          <React.Fragment key={bus.id}>
            <ListItem alignItems="flex-start">
              <div
                style={{
                  backgroundColor: 'black',
                  color: 'white',
                  width: '70px',
                  height: '40px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: '16px',
                  borderRadius: '4px',
                }}
              >
                {service.id}
              </div>
              <ListItemText
                //primary={`Servicio: ${service.id}`}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline', fontWeight: 'bold' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Tiempo de Llegada: entre {bus.min_arrival_time} y {bus.max_arrival_time} min.
                    </Typography>
                    
                    {` Distancia: ${bus.meters_distance} metros / ${metersToKilometers(bus.meters_distance)} kilómetros`}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))
      )}
    </List>
  );
};

export default BusList;
