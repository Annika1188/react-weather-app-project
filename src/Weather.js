import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Weather.css";

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultCity || "Sydney");

  useEffect(() => {
    function search() {
      const apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

      console.log(`Searching for city: ${city}`); // Debug log
      axios
        .get(apiUrl)
        .then(handleResponse)
        .catch((error) => {
          console.error("Error fetching data:", error); // Catch errors
        });
    }

    search(); // Run search when component mounts
  }, [city]); // Adding [city] here ensures search updates when city changes

  function handleResponse(response) {
    console.log("API Response:", response.data);
    setWeatherData({
      ready: true,
      coordinates: response.data.coord,
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      date: new Date(response.data.dt * 1000),
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      wind: response.data.wind.speed,
      city: response.data.name,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setWeatherData({ ready: false }); // Reset weather data while loading
    setCity(city); // Trigger the `useEffect` to fetch new data
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  if (weatherData.ready) {
    console.log("Weather Data:", weatherData);
    return (
      <div className="Weather">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-9">
              <input
                type="search"
                placeholder="Enter a city.."
                className="form-control"
                autoFocus="on"
                onChange={handleCityChange}
              />
            </div>
            <div className="col-3">
              <input
                type="submit"
                value="Search"
                className="btn btn-primary w-100"
              />
            </div>
          </div>
        </form>{" "}
        {/* Weather Data Display */}
        {weatherData.ready && (
          <div className="WeatherData">
            <h2>{weatherData.city}</h2>
            <ul>
              <li>Temperature: {Math.round(weatherData.temperature)}°C</li>
              <li>Description: {weatherData.description}</li>
              <li>Humidity: {weatherData.humidity}%</li>
              <li>Wind Speed: {Math.round(weatherData.wind)} km/h</li>
            </ul>
          </div>
        )}
      </div>
    );
  } else {
    return "Loading...";
  }
}
