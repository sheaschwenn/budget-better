import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import './Settings.css';

const Settings = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  return (
    <div>
      <Navbar />
      <h2>Settings</h2>

      <div>
        <h3>Theme</h3>
        <label>
          <input
            type="checkbox"
            checked={isDarkMode}
            onChange={handleDarkModeToggle}
          />
          Dark Mode
        </label>
      </div>

      <div>
        <h3>Currency</h3>
        <select value={selectedCurrency} onChange={handleCurrencyChange}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
        </select>
      </div>

      <div>
        <h3>Language</h3>
        <select value={selectedLanguage} onChange={handleLanguageChange}>
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
          <option value="French">French</option>
        </select>
      </div>
    </div>
  );
};

export default Settings;