import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Weather from "./Weather";
function App() {
  return (
    <div className="App">
      <Weather />
      <button className="btn btn-success">Click Me</button>
    </div>
  );
}

export default App;
