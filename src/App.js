import './style.css';
import React, { useState } from 'react';

function App() {
const [city, setCity] = useState('');

const handleSearch = (e) => {
  setCity(e.taget.value);
}

const searchWeather = () => {
//API CALLS

}
  return (
    <div className="app-container">
      <h1>Weather App</h1>
      <input
      type="text"
      placeholder='Enter city'
      value={city}
      onChange={handleSearch}
      />
      <button onClick={searchWeather}>Search</button>

      <div className='"weather-info'>
        {/*Weather data to be displayed here*/}
      </div>
    </div>
  );
}

export default App;
