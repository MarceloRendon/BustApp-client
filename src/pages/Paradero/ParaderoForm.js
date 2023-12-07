//const response = await fetch(`http://localhost:5005/paradero/${codigoParadero}`);

import React, { useState } from 'react';
import './ParaderoForm.css';
//import BusCard from '../../components/BusCard';
import BusList from '../../components/BusList';
import SubmitButton from '../../components/SubmitButton';
import CustomTextField from '../../components/CustomTextField';


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
          <CustomTextField
            value={codigoParadero}
            onChange={(e) => setCodigoParadero(e.target.value)}
          />
            <SubmitButton onClick={handleSubmit} />
          </form>
          {error && <p>{error}</p>}
          <div className="list-container">
            {paraderoInfo && paraderoInfo.services &&  (
              <div>
                <h3>Información del Paradero:</h3>
                <p>ID del Paradero: {paraderoInfo.id}</p>
                <p>Nombre del Paradero: {paraderoInfo.name}</p>
                <h4>Servicios:</h4>

                <BusList paraderoInfo={paraderoInfo} />
              </div>
            )}
          </div>
      </div>
    </div>
  );
};

export default ParaderoForm;

// import React, { useState } from 'react';
// import './ParaderoForm.css';
// import BusList from '../../components/BusList';
// import SubmitButton from '../../components/SubmitButton';
// import CustomTextField from '../../components/CustomTextField';
// import AccordionComponent from '../../components/AccordionComponent'; // Importa el componente de acordeón

// const ParaderoForm = () => {
//   const [codigoParadero, setCodigoParadero] = useState('');
//   const [paraderoInfo, setParaderoInfo] = useState(null);
//   const [error, setError] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch(`http://localhost:5005/paradero/${codigoParadero}`);
//       if (response.ok) {
//         const data = await response.json();
//         sortBuses(data);
//         setParaderoInfo(data);
//         setError(null);
//       } else {
//         setError('Error al obtener información del paradero');
//         setParaderoInfo(null);
//       }
//     } catch (error) {
//       setError('Error interno del servidor');
//       setParaderoInfo(null);
//     }
//   };

//   const sortBuses = (data) => {
//     data.services.forEach(service => {
//       service.buses.sort((a, b) => a.max_arrival_time - b.max_arrival_time);
//     });
//   };

//   return (
//     <div className="container">
//       <div className="form-container">
//         <form onSubmit={handleSubmit} className="form">
//           <CustomTextField
//             value={codigoParadero}
//             onChange={(e) => setCodigoParadero(e.target.value)}
//           />
//           <SubmitButton onClick={handleSubmit} />
//         </form>
//         {error && <p>{error}</p>}
//         <div className="list-container">
//           {paraderoInfo && paraderoInfo.services && (
//             <AccordionComponent
//               id={paraderoInfo.id}
//               name={paraderoInfo.name}
//               buses={<BusList paraderoInfo={paraderoInfo} />}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ParaderoForm;


// import React, { useState, useRef } from 'react';
// import './ParaderoForm.css';
// import BusList from '../../components/BusList';
// import SubmitButton from '../../components/SubmitButton';
// import CustomTextField from '../../components/CustomTextField';
// import AccordionComponent from '../../components/AccordionComponent';

// const ParaderoForm = () => {
//   const [codigoParadero, setCodigoParadero] = useState('');
//   const [paraderos, setParaderos] = useState([]);
//   const [error, setError] = useState(null);
//   const formRef = useRef(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch(`http://localhost:5005/paradero/${codigoParadero}`);
//       if (response.ok) {
//         const data = await response.json();
//         sortBuses(data);
//         setParaderos([...paraderos, data]);
//         setError(null);
//       } else {
//         setError('Error al obtener información del paradero');
//       }
//     } catch (error) {
//       setError('Error interno del servidor');
//     }
//   };

//   const sortBuses = (data) => {
//     data.services.forEach(service => {
//       service.buses.sort((a, b) => a.max_arrival_time - b.max_arrival_time);
//     });
//   };

//   const handleAccordionChange = (index) => {
//     setParaderos(prevParaderos =>
//       prevParaderos.map((paradero, i) =>
//         i === index ? { ...paradero, expanded: !paradero.expanded } : paradero
//       )
//     );
//   };

//   return (
//     <div className="container">
//       <div className="form-container" ref={formRef}>
//         <form onSubmit={handleSubmit} className="form">
//           <CustomTextField
//             value={codigoParadero}
//             onChange={(e) => setCodigoParadero(e.target.value)}
//           />
//           <SubmitButton onClick={handleSubmit} />
//         </form>
//         {error && <p>{error}</p>}
//       </div>
//       <div className="list-container" style={{ height: '500px', overflowY: 'auto' }}>
//         {paraderos.map((paradero, index) => (
//           <div key={index} style={{ marginBottom: '10px' }}>
//             <AccordionComponent
//               id={paradero.id}
//               name={paradero.name}
//               buses={<BusList paraderoInfo={paradero} />}
//               expanded={paradero.expanded}
//               onChange={() => handleAccordionChange(index)}
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ParaderoForm;




