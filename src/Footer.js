import React from "react";
import "./Weather.css";

export default function Footer() {
  return (
    <footer className="Footer">
      <p>
        Coded by <strong>Your Name</strong> |{" "}
        <a
          href="https://github.com/your-github"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>{" "}
        |{" "}
        <a
          href="https://your-netlify-link.netlify.app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Netlify
        </a>
      </p>
    </footer>
  );
}
