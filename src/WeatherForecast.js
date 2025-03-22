import React, { useState } from "react";
import "./WeatherForecast.css";
import axios from "axios";
import WeatherForecastDay from "./WeatherForecastDay";

export default function WeatherForecast(props) {
  let [loaded, setLoaded] = useState(false);
  let [forecast, setForecast] = useState(null);

  function handleResponse(response) {
    console.log("API Response:", response.data);

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
          {forecast.map((dailyForecast, index) =>
            dailyForecast ? ( // ✅ Added safety check
              <div className="col" key={index}>
                <WeatherForecastDay data={dailyForecast} />
              </div>
            ) : null
          )}
        </div>
      </div>
    );
  } else {
    let apiKey = "2t140860597f63afo033b6cda0bf4143";
    let longitude = props.coordinates.longitude;
    let latitude = props.coordinates.latitude;
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${latitude}&lon=${longitude}&key=${apiKey}&units=metric`;

    axios
      .get(apiUrl)
      .then(handleResponse)
      .catch((error) => {
        console.error("Error fetching forecast data:", error);
      });

    return null;
  }
}
