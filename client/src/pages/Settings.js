
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Settings = () => {
  const [isLightMode, setIsLightMode] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [selectedLanguage, setSelectedLanguage] = useState("English");
import React, { useState, useContext } from 'react';
import { ThemeContext } from '../utils/ThemeContext';

const Settings = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const styles = {
    backgroundColor: isDarkMode ? '#000000' : '#ffffff',
    color: isDarkMode ? '#ffffff' : '#000000',
  };

  return (
    <div style={styles}>
      <h2>Settings</h2>
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
      <Footer />
    </div>
  );
};

export default Settings;
