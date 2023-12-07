import React from 'react';
import { Box, Card, CardContent, CardActions, Button, Typography } from '@mui/material';


const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    &bull;
  </Box>
);

const BusCard = ({ bus }) => {
  return (
    <Card sx={{ minWidth: 275, marginBottom: '10px' }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          ID del Servicio: {bus.serviceId}
        </Typography>
        <Typography variant="h5" component="div">
          Distancia: {bus.meters_distance} metros
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Tiempo de Llegada: entre {bus.min_arrival_time} y {bus.max_arrival_time} minutos
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default BusCard;
