import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./routes/Routes"; // Import the routes configuration
import "./App.css"; // Custom CSS

function App() {
  return (
    <div className="App">
      <Router>
        {/* Routing configuration from Routes.js */}
        <AppRoutes />
      </Router>

      {/* Toast notification container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
