import React, { useState, useEffect } from "react";

import axios from "axios";
import WeatherInfo from "./WeatherInfo";
import WeatherForecast from "./WeatherForecast";
import "./Weather.css";

export default function Weather(props) {
  const [city, setCity] = useState(props.defaultCity || "Sydney");
  const [weatherData, setWeatherData] = useState({ ready: false });

  useEffect(() => {
    function search() {
      const apiKey = "2t140860597f63afo033b6cda0bf4143"; // Correct API Key
      let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

      axios
        .get(apiUrl)
        .then(handleResponse)
        .catch((error) => {
          console.error("Error fetching weather data:", error);
        });
    }

    search();
  }, [city]);

  function handleResponse(response) {
    console.log("API Response:", response.data);

    if (response.data.temperature) {
      setWeatherData({
        ready: true,
        coordinates: response.data.coordinates,
        temperature: response.data.temperature.current,
        humidity: response.data.temperature.humidity,
        date: new Date(response.data.time * 1000),
        description: response.data.condition.description,
        icon: response.data.condition.icon,
        wind: response.data.wind.speed,
        city: response.data.city,
      });
    } else {
      console.error("Unexpected API response structure:", response.data);
    }
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  if (weatherData.ready) {
    return (
      <div className="container">
        <form onSubmit={handleSubmit} className="search-form mb-4">
          <div className="row justify-content-center">
            <div className="col-8">
              <input
                type="search"
                placeholder="Enter a city..."
                className="form-control"
                autoFocus="on"
                onChange={handleCityChange}
              />
            </div>
            <div className="col-2">
              <input
                type="submit"
                value="Search"
                className="btn btn-primary w-100"
              />
            </div>
          </div>
        </form>

        <WeatherInfo data={weatherData} />
        <WeatherForecast coordinates={weatherData.coordinates} />
      </div>
    );
  } else {
    return "Loading...";
  }
}
