import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./Footer";
import Weather from "./Weather";
import ErrorBoundary from "./ErrorBoundary"; // Added Error Boundary

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <Weather defaultCity="Sydney" />
      </ErrorBoundary>
      <Footer />
    </div>
  );
}

export default App;
