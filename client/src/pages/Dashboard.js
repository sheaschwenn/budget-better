import React, { useEffect, useRef } from 'react';
import { generateExpensePieChart } from '../utils/chart';

import { GET_EXPENSES } from '../utils/queries';
import { useQuery } from '@apollo/client';


const Dashboard = () => {
  const chartRef = useRef(null);




  const { loading, error, data } = useQuery(GET_EXPENSES);

  useEffect(() => {
    if (chartRef.current && data?.me?.expenses.length > 0) {
      generateExpensePieChart(chartRef.current, data.me.expenses);
    }
  }, [data]);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

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