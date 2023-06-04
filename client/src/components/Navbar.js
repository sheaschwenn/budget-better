import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import '../styles/Navbar.css'

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li className="dropdown">
          <div className="dropdown-toggle" onClick={toggleDropdown}>
            Menu
          </div>
          {dropdownOpen && (
            <ul className="dropdown-menu">
              <li>
                <Link to="/settings">Settings</Link>
              </li>
              <li>
                <Link to="/help">Help</Link>
              </li>
              <li>
                <Link to="/faq">FAQ</Link>
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
      </ul>
    </nav>
  );
};

export default Navbar;