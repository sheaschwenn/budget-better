import React, { useState, useEffect, useRef } from 'react';
// import Navbar from '../components/Navbar';
import { generateExpensePieChart } from '../utils/chart';
import { useQuery } from '@apollo/client';

import { GET_ME } from '../utils/queries';

const Dashboard = () => {
  const chartRef = useRef(null);
  const [expenses, setExpenses] = useState([]);

  const {loading, data} = useQuery(GET_ME)
  const me = data?.me || []

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