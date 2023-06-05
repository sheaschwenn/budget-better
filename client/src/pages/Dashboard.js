import React, { useState, useEffect, useRef, useContext } from 'react';
import { generateExpensePieChart } from '../utils/chart';
import { ThemeContext } from '../utils/ThemeContext';
import { GET_EXPENSES } from '../utils/queries';
import { useQuery } from '@apollo/client';


const Dashboard = () => {
  const chartRef = useRef(null);
  const [expenses, setExpenses] = useState([]);
  const { isDarkMode } = useContext(ThemeContext);


  const { loading, error, data } = useQuery(GET_EXPENSES);

  useEffect(() => {
    if (chartRef.current && data?.me?.expenses.length > 0) {
      generateExpensePieChart(chartRef.current, data.me.expenses);
    }
  }, [data]);

  const styles = {
    backgroundColor: isDarkMode ? '#000000' : '#ffffff',
    color: isDarkMode ? '#ffffff' : '#000000',
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

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