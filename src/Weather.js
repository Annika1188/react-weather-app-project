import React, { useState, useEffect } from "react";
import WeatherForecast from "./WeatherForecast";
import axios from "axios";
import WeatherInfo from "./WeatherInfo";
import "./Weather.css";

export default function Weather(props) {
  const [city, setCity] = useState(props.defaultCity || "Sydney");
  const [weatherData, setWeatherData] = useState({ ready: false });

  useEffect(() => {
    function search() {
      const apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

      axios.get(apiUrl).then(handleResponse);
    }

    search();
  }, [city]);

  function handleResponse(response) {
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
        <WeatherForecast />
      </div>
    );
  } else {
    return "Loading...";
  }
}
