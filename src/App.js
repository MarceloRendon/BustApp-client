import React from 'react';
import { ReactComponent as IconGithub } from './assets/icons/github.svg';
import { ReactComponent as IconLinkedin } from './assets/icons/linkedin.svg';
import "./App.css";
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';


// api https://api.xor.cl/red/bus-stop/PC131
// api backend `http://localhost:5005/paradero/${codigoParadero}`

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      codigoParadero: '',
      paraderos: [],
    };
  }

  handleChange = (event) => {
    this.setState({ codigoParadero: event.target.value });
  }

  // fetchData = () => {
  //   const { codigoParadero, paraderos } = this.state;
  //   fetch(`http://localhost:5005/paradero/${codigoParadero}`)
  //     .then(response => response.json())
  //     .then(data => {
  //       if (data.services && data.services.length > 0) {
  //         const buses = data.services.reduce((allBuses, service) => {
  //           if (service.buses && service.buses.length > 0) {
  //             const busesWithServiceId = service.buses.map(bus => ({ ...bus, serviceId: service.id }));
  //             return allBuses.concat(busesWithServiceId);
  //           }
  //           return allBuses;
  //         }, []);
  //         const newParadero = { codigoParadero, buses };
  //         this.setState({ paraderos: [...paraderos, newParadero] });
  //       } else {
  //         this.setState({ paraderos: [...paraderos] });
  //       }
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //       this.setState({ paraderos: [...paraderos] });
  //     });
  // }

  fetchData = async () => {
    try {
      const { codigoParadero, paraderos } = this.state;
      const response = await fetch(`https://api.xor.cl/red/bus-stop/${codigoParadero}`);
      if (response.ok) {
        const data = await response.json();
        if (data.services && data.services.length > 0) {
          const buses = data.services.reduce((allBuses, service) => {
            if (service.buses && service.buses.length > 0) {
              const busesWithServiceId = service.buses.map(bus => ({ ...bus, serviceId: service.id }));
              return allBuses.concat(busesWithServiceId);
            }
            return allBuses;
          }, []);
          const newParadero = { codigoParadero, buses };
          this.setState({ paraderos: [...paraderos, newParadero], error: null });
        } else {
          this.setState({ paraderos: [...paraderos], error: 'No hay información de servicios disponibles' });
        }
      } else {
        throw new Error('Error al obtener información del paradero');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      this.setState({ error: 'Error interno del servidor' });
    }
  };
  

  render() {
    const { paraderos, error } = this.state;
    return (
      <div className="card">
        <div className="header">
          <div className="logo">
            <a href=".">BustApp</a>
          </div>
          <div className="social">
            <a href="#" title="Linkedin" target="_blank" rel="noopener noreferrer">
              <IconLinkedin className="icon" />
            </a>
            <a href="https://github.com/MarceloRendon" title="GitHub" target="_blank" rel="noopener noreferrer">
              <IconGithub className="icon" />
            </a>
          </div>
        </div>
        <div className="content">
        <div className="title-holder">
            <h1>¡Listo para zarpar hacia tu destino! Descubre todo sobre tu bus aquí.</h1>
            <p>Ingresa el código de tu paradero abajo para obtener información.</p>
          </div>
          <div className="search">
            <TextField
              className="search-input"
              id="filled-basic"
              label="Código Paradero"
              variant="filled"
              style={{ backgroundColor: 'white' }}
              InputProps={{
                style: { backgroundColor: 'white', color: 'black' },
                classes: {
                  root: 'filledInputRoot',
                  focused: 'filledInputFocused',
                },
              }}
              InputLabelProps={{
                style: { color: 'black' },
              }}
              sx={{
                '& .filledInputRoot .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'black', // Color del borde del TextField
                },
              }}
              onChange={this.handleChange}
            />
            <button
              className="search-button"
              variant="contained"
              style={{ backgroundColor: '#4158D0', color: 'white', height: '56px', minWidth: 'unset' }}
              onClick={this.fetchData}
            >
              Buscar
            </button>
          </div>

          {error ? (
            <div className="error-message">
              <p>{error}</p>
            </div>
          ) : (
            paraderos.map((paradero, index) => (
              <div key={index} className="bus-info">
                <h2>Paradero {paradero.codigoParadero}</h2>
                {paradero.buses.length > 0 ? (
                  paradero.buses.map((bus) => (
                    <div key={bus.id} className="bus">
                      <div className="service-id">{bus.serviceId}</div>
                      <ListItemText
                        primary={`Tiempo de Llegada: entre ${bus.min_arrival_time} y ${bus.max_arrival_time} min.`}
                        secondary={`Distancia: ${bus.meters_distance} metros`}
                      />
                    </div>
                  ))
                ) : (
                  <p>No hay información de buses disponible.</p>
                )}
              </div>
            ))
          )}
        </div>

        <div className="footer">
          <span>made by <a className="underlined" href="https://github.com/MarceloRendon" target="_blank" rel="noopener noreferrer">Marcelo Rendón</a> using <a className="underlined" href="https://reactjs.org/" title="ReactJS" target="_blank" rel="noopener noreferrer">React</a> | <a className="underlined" href="https://github.com/MarceloRendon" title="GitHub repo" target="_blank" rel="noopener noreferrer">GitHub</a></span>
        </div>
      </div>
    );
  }
}

export default App;
