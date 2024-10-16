import "./style.css";
import React, { useState } from "react";
import { getWeatherData, getForecastData } from "./services/weatherService";

function App() {
  const [cityCoords, setCityCoords] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = (e) => {
    console.log(e);
    setCityCoords(e.target.value);
  };

  const searchWeather = async () => {
    // console.log("searchWeather function triggered.")
    // if (!cityCoords) {
    //   setError("Please enter coordinates");
    //   return;
    // }
    // setError("");

    // const [lat, lon] = cityCoords.split(",");
    // console.log("City coordinates:", cityCoords)
    // console.log("Lat:", lat)
    // console.log("Lon:", lon)

    try {
      console.log("City coordinates:", cityCoords)
      const [lat, lon] = cityCoords.split(",");

      const weatherData = await getWeatherData(lat, lon);
      const forecastData = await getForecastData(lat, lon);  
      setWeather(weatherData);
      setForecast(forecastData);

      console.log("Forecast Data:", forecastData);

    } catch (err) {
      setError("Unable to fetch data. Check the coordinates are correct.");
    }
  };

  return (
    <div className="app-container">
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city coordinates (lat,lon)"
        value={cityCoords}
        onChange={handleSearch}
      />
      <button onClick={searchWeather}>Search</button>

      {error && <p className="error">{error}</p>}

      {weather && 
      (
        <div className='"weather-info'>
          <h2>Current Weather</h2>
          <p>Temperature: {weather.data[0].coordinates[0].dates[0].value}°C</p>
        </div>
      )}

      {forecast && (
        <div className="forecast-info">
          <h3>5-Day Forecast</h3>
          <div className="forecast">
            {forecast.data[0].coordinates[0].dates.map((date, index) => (
              <div key={index} classNAme="forecase-day">
                <p>{new Date(date.date).toLocaleDateString()}</p>
                <p>Temperature: {date.value}°C</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
