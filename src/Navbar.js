// src/components/Navbar.js

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "./services/authService";
import "./Navbar.css"; // Import the CSS file

const Navbar = () => {
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    AuthService.logout(); // Call the logout function from authService
    navigate("/"); // Redirect to the landing page after logout
  };

  // Check if the user is logged in
  const currentUser = AuthService.getCurrentUser(); // Adjust this method to match your authService implementation

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Book Management
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {!currentUser ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    Signup
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button className="nav-link btn" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
