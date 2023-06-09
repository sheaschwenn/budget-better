import React, { useState, useContext } from "react";
import { ThemeContext } from '../utils/ThemeContext';


const Settings = () => {
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const { isDarkMode } = useContext(ThemeContext);
  const styles = {
    backgroundColor: isDarkMode ? "#192734" : "#ffffff",
    color: isDarkMode ? "#ffffff" : "#121212",
  };

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  return (
    <div className="pointer-event-none isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="bg-white shadow p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Settings</h2>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Currency</h3>
          <select
            className="border border-gray-300 p-2 rounded"
            value={selectedCurrency}
            onChange={handleCurrencyChange}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Language</h3>
          <select
            className="border border-gray-300 p-2 rounded"
            value={selectedLanguage}
            onChange={handleLanguageChange}
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Settings;
