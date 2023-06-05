// DarkMode.js
import React, { useContext } from 'react';
import { ThemeContext } from '../utils/ThemeContext';
import './DarkMode.css'; // Import CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

const DarkMode = () => {
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);

  const themeStyles = {
    backgroundColor: isDarkMode ? '#000000' : '#ffffff',
    color: isDarkMode ? '#ffffff' : '#000000',
  };

  return (
    <div className="dark-mode-container" style={themeStyles}>
      <label className="switch">
        <input type="checkbox" checked={isDarkMode} onChange={toggleDarkMode} />
        <span className="slider">
          <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
        </span>
      </label>
    </div>
  );
};

export default DarkMode;
