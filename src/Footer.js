import React from "react";
import "./Weather.css";

export default function Footer() {
  return (
    <footer className="Footer">
      <p>
        Coded by <strong>Annika Scharkie </strong> |{" "}
        <a
          href="https://github.com/Annika1188/react-weather-app-project"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>{" "}
        |{" "}
        <a
          href="https://annikasweatherappreact.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Netlify
        </a>
      </p>
    </footer>
  );
}
