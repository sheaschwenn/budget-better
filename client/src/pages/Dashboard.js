import React, { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';
import { generateExpensePieChart } from '../utils/chartUtils';

const Dashboard = () => {
  const chartRef = useRef(null);
  const [expenses, setExpenses] = useState([]);

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

  return (
    <div>
      <Navbar />
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