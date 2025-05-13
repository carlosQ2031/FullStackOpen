import React, { useState } from 'react';
import countryService from './services/countries';

const App = () => {
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState([]);
  const [message, setMessage] = useState('');

  // Función para manejar la entrada en el campo de búsqueda
  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearch(query);

    // Si la búsqueda está vacía, reiniciamos los estados
    if (query.trim() === '') {
      setCountries([]);
      setMessage('');
      return;
    }
    
    // Obtenemos todos los países y filtramos localmente
    countryService.getAll()
      .then(data => {
        //filtered es de tipo array
        const filtered = data.filter(country =>
          country.name.common.toLowerCase().includes(query.toLowerCase())
        );
        if (filtered.length > 10) {
          setMessage('Too many matches, please be more specific.');
          setCountries([]);
        } else if (filtered.length === 0) {
          setMessage('No countries found.');
          setCountries([]);
        } else {
          setMessage('');
          setCountries(filtered);
        }
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
        setMessage('Error fetching data.');
        setCountries([]);
      });
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Countries</h1>
      <div>
        Find countries: <input type="text" value={search} onChange={handleSearchChange} />
      </div>

      {/* Mostrar mensaje si hay error o demasiados resultados */}
      {message && <p>{message}</p>}

      {/* Si hay entre 2 y 10 países, se muestra una lista con el nombre */}
      {countries.length > 1 && countries.length <= 10 && (
        <ul>
          {countries.map(country => (
            <li key={country.cca2}>{country.name.common}</li>
          ))}
        </ul>
      )}

      {/* Si hay exactamente 1 país, se muestran sus detalles */}
      {countries.length === 1 && <CountryDetail country={countries[0]} />}
    </div>
  );
};

// Componente para mostrar la información detallada del país
const CountryDetail = ({ country }) => {
  const { name, capital, area, languages, flags } = country;
  return (
    <div style={{ marginTop: '1rem' }}>
      <h2>{name.common}</h2>
      <p>Capital: {capital}</p>
      <p>Area: {area} km²</p>
      <h3>Languages:</h3>
      <ul>
        {languages && Object.values(languages).map((lang, index) => (
          <li key={index}>{lang}</li>
        ))}
      </ul>
      <img
        src={flags.png}
        alt={`Flag of ${name.common}`}
        style={{ width: '200px', border: '1px solid #ccc' }}
      />
    </div>
  );
};

export default App;
