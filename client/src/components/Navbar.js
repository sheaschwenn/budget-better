import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import '../styles/Navbar.css'
import DarkMode from '../components/DarkMode';
import { ThemeContext } from '../utils/ThemeContext';



const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { isDarkMode } = useContext(ThemeContext);


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

  const styles = {
    backgroundColor: isDarkMode ? '#000000' : '#ffffff',
    color: isDarkMode ? '#ffffff' : '#000000',
  };

  return (
    <nav style={styles}>
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
      </ul>
    </nav>
  );
};

export default Navbar;
