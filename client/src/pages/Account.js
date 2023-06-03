import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import './Account.css';

const Account = () => {
  const [selectedTab, setSelectedTab] = useState('');

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

  return (
    <div>
  <Navbar />
    <div className='account-page'>
      
      <h2 className='account-title'>Account</h2>
      <div className='tab-selector'>
        <button className={`tab ${selectedTab === 'income' ? 'active' : ''}`} onClick={() => handleTabChange('income')}>Income</button>
        <button className={`tab ${selectedTab === 'expenses' ? 'active' : ''}`} onClick={() => handleTabChange('expenses')}>Expenses</button>
        <button className={`tab ${selectedTab === 'goals' ? 'active' : ''}`} onClick={() => handleTabChange('goals')}>Goals</button>
      </div>
      {selectedTab === 'income' && (
        <form className='form' onSubmit={handleIncomeSubmit}>
          <input className='form-input' type="text" placeholder="Name" />
          <div className='radio-group'>
            <label className='radio-label'>
              <input type="radio" value="passive" name="incomeType" />
              Passive
            </label>
            <label className='radio-label'>
              <input type="radio" value="active" name="incomeType" />
              Active
            </label>
          </div>
          <input className='form-input' type="number" placeholder="Amount" />
          <label className='form-label'>
            Frequency:
            <select className='form-input'>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </label>
          <button className='form-button' type="submit">Submit</button>
        </form>
      )}
      {selectedTab === 'expenses' && (
        <form className='form' onSubmit={handleExpenseSubmit}>
          <input className='form-input' type="text" placeholder="Category" />
          <input className='form-input' type="number" placeholder="Amount" />
          <label className='form-label'>
            Frequency:
            <select className='form-input'>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </label>
          <button className='form-button' type="submit">Submit</button>
        </form>
      )}
      {selectedTab === 'goals' && (
        <form className='form' onSubmit={handleGoalSubmit}>
          <input className='form-input' type="text" placeholder="Name" />
          <input className='form-input' type="number" placeholder="Amount to Save" />
          <input className='form-input' type="date" placeholder="Deadline" />
          <button className='form-button' type="submit">Submit</button>
        </form>
      )}
    </div>
    </div>
  );
};

export default Account;