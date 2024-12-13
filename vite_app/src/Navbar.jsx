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
                <div className="menu">
                    <Link to="/Api1" className="nav-link">Api1</Link>
                    <Link to="/Api2" className="nav-link">Api2</Link>
                    <Link to="/Api3" className="nav-link">Api3</Link>
                    <Link to="/Api4" className="nav-link">Api4</Link>
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