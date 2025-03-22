import React, { useState, useEffect } from "react";
import "./WeatherForecast.css";
import axios from "axios";
import WeatherForecastDay from "./WeatherForecastDay";

export default function WeatherForecast(props) {
  let [loaded, setLoaded] = useState(false);
  let [forecast, setForecast] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(false);
      const apiKey = "2t140860597f63afo033b6cda0bf4143";
      const longitude = props.coordinates.longitude;
      const latitude = props.coordinates.latitude;
      const apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${latitude}&lon=${longitude}&key=${apiKey}&units=metric`;

      axios
        .get(apiUrl)
        .then(handleResponse)
        .catch((error) => {
          console.error("Error fetching forecast data:", error);
        });
    }, 1000); // 1-second delay to prevent too many requests

    return () => clearTimeout(timer); // Clean up the timer on unmount
  }, [props.coordinates]);

  function handleResponse(response) {
    console.log("Forecast Data:", response.data.daily);

    if (response.data.daily) {
      setForecast(response.data.daily);
      setLoaded(true);
    } else {
      console.error("No 'daily' forecast data found:", response.data);
    }
  }

  if (loaded && forecast) {
    return (
      <div className="WeatherForecast">
        <div className="row">
          {forecast.slice(0, 5).map((dailyForecast, index) =>
            dailyForecast ? (
              <div className="col" key={index}>
                <WeatherForecastDay data={dailyForecast} />
              </div>
            ) : null
          )}
        </div>
      </div>
    );
  } else {
    return null;
  }
}
