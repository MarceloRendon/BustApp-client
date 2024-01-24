import React from 'react';
import { ReactComponent as IconGithub } from './assets/icons/github.svg';
import { ReactComponent as IconLinkedin } from './assets/icons/linkedin.svg';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      codigoParadero: '',
      paraderos: [],
      favoritos: [],
      error: null,
    };
  }

  handleChange = (event) => {
    this.setState({ codigoParadero: event.target.value });
  }

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
          this.setState({ error: 'No hay información de servicios disponibles' });
        }
      } else {
        throw new Error('Error al obtener información del paradero');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      this.setState({ error: 'Error interno del servidor' });
    }
  };

  guardarFavorito = async (paradero) => {
    const { paraderos } = this.state;
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    favoritos.push(paradero);
    localStorage.setItem('favoritos', JSON.stringify(favoritos));

    // Realizar una nueva consulta a la API para obtener la información más reciente
    try {
      const response = await fetch(`https://api.xor.cl/red/bus-stop/${paradero.codigoParadero}`);
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
          const updatedParadero = { codigoParadero: paradero.codigoParadero, buses };

          // Actualizar la lista de paraderos en el estado
          this.setState({ paraderos: [...paraderos, updatedParadero], favoritos, error: null });
        } else {
          this.setState({ error: 'No hay información de servicios disponibles' });
        }
      } else {
        throw new Error('Error al obtener información del paradero');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      this.setState({ error: 'Error interno del servidor' });
    }
  };

  verFavoritos = () => {
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    this.setState({ favoritos });
  };

  render() {
    const { paraderos, favoritos, error } = this.state;
    return (
      <div className="card">
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
                  borderColor: 'black',
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

          {/* Botón y sección para guardar favorito y ver favoritos */}
          <div className="favoritos-section">
            <button
              className="favoritos-button"
              onClick={this.verFavoritos}
            >
              Ver Favoritos
            </button>
            {error ? (
              <div className="error-message">
                <p>{error}</p>
              </div>
            ) : (
              favoritos.length > 0 && (
                <div className="favoritos-list">
                  <h2>Favoritos</h2>
                  {favoritos.map((favorito, index) => (
                    <div key={index} className="bus-info">
                      <h2>Paradero {favorito.codigoParadero}</h2>
                      {favorito.buses.length > 0 ? (
                        favorito.buses.map((bus) => (
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
                  ))}
                </div>
              )
            )}
          </div>

          {paraderos.map((paradero, index) => (
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
              <button
                className="guardar-favorito-button"
                onClick={() => this.guardarFavorito(paradero)}
              >
                Guardar como favorito
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
