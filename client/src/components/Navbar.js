import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import '../styles/Navbar.css'
import DarkMode from '../components/DarkMode';



const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
 


  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };



  return (
    <nav>
      <ul className="nav">
      <DarkMode />
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li className={`dropdown ${dropdownOpen ? 'open' : ''}`}>
          <div className="dropdown-toggle" onClick={toggleDropdown}>
            Menu
          </div>
          {dropdownOpen && (
            <ul className="dropdown-menu">
              <li>
                <Link to="/settings" onClick={closeDropdown}>Settings</Link>
              </li>
              <li>
                <Link to="/help" onClick={closeDropdown}>Help</Link>
              </li>
              <li>
                <Link to="/faq" onClick={closeDropdown}>FAQ</Link>
              </li>
              <li>
                <Link to="/" onClick={logout}>Logout</Link>
              </li>
            </ul>
            
          )}
        </li>
        <li>
          <Link to="/account">Account</Link>
        </li>
        <li>
          <Link to="/cashbot">Cashbot</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/demo">Demo</Link>
        </li>
        <li>
          <Link to="/features">Features</Link>
        </li>
        <li>
          <Link to="/ourmission">Our Mission</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
