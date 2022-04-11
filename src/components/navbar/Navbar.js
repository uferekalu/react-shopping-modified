import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ darkMode, setDarkMode }) => {
  const handleSetDarkMode = () => {
    setDarkMode(!darkMode);
  };
  return (
    <div className="nav-cover">
      <header className="header">
        <div className="header-content">
          <div className="header-text"><Link to={`/`}>Shop</Link></div>
          <button className="header-button" onClick={handleSetDarkMode}>
            {!darkMode ? <FaMoon /> : <FaSun />} {!darkMode ? "Dark Mode" : "Light Mode"}
          </button>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
