import React, { useState, useContext } from 'react';
import { ThemeContext } from '../utils/ThemeContext';


const Account = () => {
  const [selectedTab, setSelectedTab] = useState('');
  const { isDarkMode } = useContext(ThemeContext);


  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handleIncomeSubmit = (event) => {
    event.preventDefault();
    // Handle income submission logic
  };

  const handleExpenseSubmit = (event) => {
    event.preventDefault();
    // Handle expense submission logic
  };

  const handleGoalSubmit = (event) => {
    event.preventDefault();
    // Handle goal submission logic
  };

  const styles = {
    backgroundColor: isDarkMode ? '#000000' : '#ffffff',
    color: isDarkMode ? '#ffffff' : '#000000',
  };

  return (
    <div style={styles}>
      <h2>Account</h2>

      <div>
        <button onClick={() => handleTabChange('income')}>Income</button>
        {selectedTab === 'income' && (
          <form onSubmit={handleIncomeSubmit}>
            <input type="text" placeholder="Name" />
            <label>
              Passive:
              <input type="checkbox" />
            </label>
            <input type="number" placeholder="Amount" />
            <label>
              Frequency:
              <select>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </label>
            <button type="submit">Submit</button>
          </form>
        )}
      </div>

      <div>
        <button onClick={() => handleTabChange('expenses')}>Expenses</button>
        {selectedTab === 'expenses' && (
          <form onSubmit={handleExpenseSubmit}>
            <input type="text" placeholder="Category" />
            <input type="number" placeholder="Amount" />
            <label>
              Frequency:
              <select>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </label>
            <button type="submit">Submit</button>
          </form>
        )}
      </div>

      <div>
        <button onClick={() => handleTabChange('goals')}>Goals</button>
        {selectedTab === 'goals' && (
          <form onSubmit={handleGoalSubmit}>
            <input type="text" placeholder="Name" />
            <input type="number" placeholder="Amount to Save" />
            <input type="date" placeholder="Deadline" />
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Account;