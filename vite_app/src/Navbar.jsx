import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);


  const toggleNavbar = () => {
    setIsActive(!isActive);
  };

  return (
    <div>
      <nav className={`navbar ${isActive ? 'active' : ''}`}>
       
        <div className="logo">MyApp</div>
        
       
        <div className={`menu ${isActive ? 'active' : ''}`}>
          <Link to="/Api1">
            <button className="fetch-button">Api1</button>
          </Link>
          <Link to="/Api2">
            <button className="fetch-button">Api2</button>
          </Link>
          <Link to="/Api3">
            <button className="fetch-button">Api3</button>
          </Link>
          <Link to="/Api4">
            <button className="fetch-button">Api4</button>
          </Link>
        </div>
        
       
        <div className="hamburger" onClick={toggleNavbar}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
