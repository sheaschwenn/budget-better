import React, { useState, useEffect, useRef, useContext } from 'react';
import { generateExpensePieChart } from '../utils/chart';
import { ThemeContext } from '../utils/ThemeContext';


const Dashboard = () => {
  const chartRef = useRef(null);
  const [expenses, setExpenses] = useState([]);
  const { isDarkMode } = useContext(ThemeContext);


  useEffect(() => {
    // Fetch expenses from the database and set the state
    const fetchedExpenses = []; // Replace with actual fetched expenses
    setExpenses(fetchedExpenses);
  }, []);

  useEffect(() => {
    if (chartRef.current && expenses.length > 0) {
      generateExpensePieChart(chartRef.current, expenses);
    }
  }, [expenses]);

  const styles = {
    backgroundColor: isDarkMode ? '#000000' : '#ffffff',
    color: isDarkMode ? '#ffffff' : '#000000',
  };

  return (
    <div style={styles}>
      <section className="dashboard-section">
        <h2>Welcome to Your Dashboard</h2>
        <div className="finance-info">
          {/* Display other finance information */}
        </div>
        <div>
          <canvas ref={chartRef}></canvas>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;