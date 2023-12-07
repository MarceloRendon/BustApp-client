import React from 'react';
import Button from '@mui/material/Button';

const SubmitButton = ({ onClick }) => {
  return (
    <Button variant="contained" onClick={onClick} sx={{
        height: '56px', 
      }}>
      Obtener Información
    </Button>
  );
};

export default SubmitButton;
