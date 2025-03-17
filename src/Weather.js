import React from "react";
import "./Weather.css";
export default function Weather() {
  return (
    <div className="weather-display">
      <h1>New York</h1>
      <ul>
        {" "}
        <li>Wednesday 07:00</li>
        <li>Mostly Cloudy</li>
      </ul>
    </div>
  );
}
