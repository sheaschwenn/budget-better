import React, { useEffect, useContext, useRef } from 'react';
import { ThemeContext } from '../utils/ThemeContext';
import { GET_EXPENSES, GET_INCOME, GET_GOAL } from '../utils/queries';
import { useQuery } from '@apollo/client';
import { generateGroupedBarChart } from '../utils/chart';

const Dashboard = () => {
  const { isDarkMode } = useContext(ThemeContext);

  const { loading: expensesLoading, error: expensesError, data: expensesData } = useQuery(GET_EXPENSES);
  const { loading: incomeLoading, error: incomeError, data: incomeData } = useQuery(GET_INCOME);
  const { loading: goalsLoading, error: goalsError, data: goalsData } = useQuery(GET_GOAL);

  const styles = {
    backgroundColor: isDarkMode ? '#000000' : '#ffffff',
    color: isDarkMode ? '#ffffff' : '#000000',
  };

  const totalExpenses = expensesData?.me?.expenses?.reduce((total, expense) => total + expense.amount, 0);
  const totalIncome = incomeData?.me?.income?.reduce((total, income) => total + income.amount, 0);
  const totalGoals = goalsData?.me?.goal?.reduce((total, goal) => total + goal.amountToSave, 0);

  const chartRef = useRef(null); // Create a ref to the canvas element

  useEffect(() => {
    if (chartRef.current) {
      // Generate the chart when the ref is available and data is loaded
      const ctx = chartRef.current.getContext('2d');
      const labels = ['Expenses', 'Income', 'Goals'];
      const datasets = [
        {
          label: 'Amount',
          data: [totalExpenses, totalIncome, totalGoals],
          backgroundColor: ['#ff6b6b', '#63b3ed', '#48bb78'],
        },
      ];
      generateGroupedBarChart(ctx, labels, datasets);
    }
  }, [expensesData, incomeData, goalsData, totalExpenses, totalIncome, totalGoals]); // Trigger chart generation when data or totals change

  if (expensesLoading || incomeLoading || goalsLoading) return <p>Loading...</p>;
  if (expensesError || incomeError || goalsError) return <p>Error :(</p>;

  return (
    <div style={styles}>
      <section className="dashboard-section">
        <h2>Welcome to Your Dashboard</h2>
        <div className="finance-info">
          <canvas ref={chartRef}></canvas>
          <p>Total Expenses: ${totalExpenses || 0}</p>
          <p>Total Income: ${totalIncome || 0}</p>
          <p>Total Goals: ${totalGoals || 0}</p>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;