import "./style.css";
import React, { useState } from "react";
import { getWeatherData, getForecastData } from "./services/weatherService";
import { cities } from "./components/cityCoordinates";

function App() {
  const [cityName, setCityName] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setCityName(e.target.value);
  };

  const handleSearch = () => {
    const city = cities[cityName.toLowerCase()];
    if (city) {
      const { lat, lon } = city;
      fetchWeatherData(lat, lon); // Call API with coordinates
      setError("");
    } else {
      setWeather(null);
      setForecast(null);
      setError("City not found.");
    }
  };

  const fetchWeatherData = async (lat, lon) => {
    try {
      const weatherData = await getWeatherData(lat, lon);
      const forecastData = await getForecastData(lat, lon);
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      setError("Unable to fetch weather data.");
    }
  };

  const searchWeather = async () => {
    console.log("searchWeather function triggered.");
    if (!cityName) {
      setError("Please enter coordinates");
      return;
    }
    setError("");

    const [lat, lon] = cityName.split(",");
    console.log("City coordinates:", cityName);
    console.log("Lat:", lat);
    console.log("Lon:", lon);

    try {
      console.log("City coordinates:", cityName);
      const [lat, lon] = cityName.split(",");

      const weatherData = await getWeatherData(lat, lon);
      const forecastData = await getForecastData(lat, lon);
      setWeather(weatherData);
      setForecast(forecastData);

      console.log("Forecast Data:", forecastData);
    } catch (err) {
      setError("Unable to fetch data. Check the coordinates are correct.");
    }
  };
  console.log(forecast);

  return (
    <div className="app-container">
      <h1>Weather App</h1>
      <label htmlFor="cityName">City Name</label>
      <input
        name="cityName"
        id="cityName"
        type="text"
        placeholder="Enter city coordinates (lat,lon)"
        value={cityName}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Search</button>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className='"weather-info'>
          <h2>Current Weather</h2>
          <p>{new Date().toLocaleDateString()}</p>
          <p>Temperature: {weather.data[0].coordinates[0].dates[0].value}°C</p>
        </div>
      )}

      {forecast && (
        <div className="forecast-info">
          <h3>5-Day Forecast</h3>
          <div className="forecast">
            {forecast.map((date, index) => (
              <div key={index} className="forecast-day">
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
