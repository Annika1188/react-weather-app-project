import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./Footer";
import Weather from "./Weather";
function App() {
  return (
    <div className="App">
      <Weather />
      <Footer />
    </div>
  );
}

export default App;
