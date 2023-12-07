import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const AccordionComponent = ({ id, name, buses }) => {
  return (
    <div>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div>
            <Typography>{`Paradero: ${id}`}</Typography>
            <Typography>{`Nombre del Paradero: ${name}`}</Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          {buses} {/* Aquí se mostrará el componente BusList */}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default AccordionComponent;