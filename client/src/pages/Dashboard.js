import React, { useEffect, useContext, useRef, useState } from 'react';
import { ThemeContext } from '../utils/ThemeContext';
import { GET_EXPENSES, GET_INCOME, GET_GOAL } from '../utils/queries';
import { useQuery } from '@apollo/client';
import { generateGroupedBarChart, generateLineChart } from '../utils/chart';

const Dashboard = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [chartVisible, setChartVisible] = useState(false); // new state variable

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
    if (chartRef.current && chartVisible) { // only generate the chart if it's visible
      const ctx = chartRef.current.getContext('2d');
      const labels = ['Your Financial Data'];
      const datasets = [
        {
          label: 'Expenses',
          data: [totalExpenses],
          backgroundColor: ['#ff6b6b'],
        },
        {
          label: 'Income',
          data: [totalIncome],
          backgroundColor: ['#63b3ed'],
        },
        {
          label: 'Goals',
          data: [totalGoals],
          backgroundColor: ['#48bb78'],
        },
      ];
      generateGroupedBarChart(ctx, labels, datasets);
    }
  }, [expensesData, incomeData, goalsData, totalExpenses, totalIncome, totalGoals, chartVisible]);


  const generateLineChartButtonClicked = () => {
    if (!chartRef.current) return;
  
    // This will store total income and expenses per month
    let incomePerMonth = {};
    let expensesPerMonth = {};
  
    // Iterate over all income
    for (let income of incomeData.me.income) {
      let monthYear = new Date(income.createdOn).toLocaleString('default', { month: 'long', year: 'numeric' });
      if (!incomePerMonth[monthYear]) incomePerMonth[monthYear] = 0;
      incomePerMonth[monthYear] += income.amount;
      if (income.recurring) {
        let nextMonth = new Date(income.createdOn);
        while (true) {
          nextMonth.setMonth(nextMonth.getMonth() + 1);
          if (nextMonth > new Date()) break;
          let nextMonthYear = nextMonth.toLocaleString('default', { month: 'long', year: 'numeric' });
          if (!incomePerMonth[nextMonthYear]) incomePerMonth[nextMonthYear] = 0;
          incomePerMonth[nextMonthYear] += income.amount;
        }
      }
    }
  
    // Do the same for expenses
    for (let expense of expensesData.me.expenses) {
      let monthYear = new Date(expense.createdOn).toLocaleString('default', { month: 'long', year: 'numeric' });
      if (!expensesPerMonth[monthYear]) expensesPerMonth[monthYear] = 0;
      expensesPerMonth[monthYear] += expense.amount;
      if (expense.recurring) {
        let nextMonth = new Date(expense.createdOn);
        while (true) {
          nextMonth.setMonth(nextMonth.getMonth() + 1);
          if (nextMonth > new Date()) break;
          let nextMonthYear = nextMonth.toLocaleString('default', { month: 'long', year: 'numeric' });
          if (!expensesPerMonth[nextMonthYear]) expensesPerMonth[nextMonthYear] = 0;
          expensesPerMonth[nextMonthYear] += expense.amount;
        }
      }
    }
  
    // Generate labels array by taking all unique month-year values and sorting them
    const labels = [...new Set([...Object.keys(incomePerMonth), ...Object.keys(expensesPerMonth)])].sort();
  
    // Generate expensesDataset and incomeDataset arrays by getting total expenses and income for each month in labels
    const expensesDataset = labels.map(monthYear => expensesPerMonth[monthYear] || 0);
    const incomeDataset = labels.map(monthYear => incomePerMonth[monthYear] || 0);
  
    const datasets = [
      {
        label: 'Expenses',
        data: expensesDataset,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      },
      {
        label: 'Income',
        data: incomeDataset,
        fill: false,
        borderColor: '#741b47',
        tension: 0.1
      }
    ];
  
    const ctx = chartRef.current.getContext('2d');
    generateLineChart(ctx, labels, datasets);
  };

  if (expensesLoading || incomeLoading || goalsLoading) return <p>Loading...</p>;
  if (expensesError || incomeError || goalsError) return <p>Error :(</p>;

  return (
    <div style={styles}>
      <section className="dashboard-section">
        <h2>Welcome to Your Dashboard</h2>
        <div className="finance-info">
          {/* Conditional rendering for chart */}
          {chartVisible && <canvas ref={chartRef}></canvas>}
          <button onClick={() => setChartVisible(!chartVisible)}>
            {chartVisible ? 'Hide Chart' : 'Bar Chart'}
          </button>
          <button onClick={generateLineChartButtonClicked}>Line Chart</button>
          <p>Total Expenses: ${totalExpenses || 0}</p>
          <p>Total Income: ${totalIncome || 0}</p>
          <p>Total Goals: ${totalGoals || 0}</p>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;