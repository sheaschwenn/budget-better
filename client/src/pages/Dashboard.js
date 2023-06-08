
import React, { useEffect, useContext, useRef } from 'react';
import { ThemeContext } from '../utils/ThemeContext';
import { GET_EXPENSES, GET_INCOME, GET_GOAL } from '../utils/queries';

import { useQuery } from '@apollo/client';
import { generateGroupedBarChart, generateLineChart } from '../utils/chart';

const Dashboard = () => {

  const { isDarkMode } = useContext(ThemeContext);


  const { loading: expensesLoading, error: expensesError, data: expensesData } = useQuery(GET_EXPENSES);
  const { loading: incomeLoading, error: incomeError, data: incomeData } = useQuery(GET_INCOME);
  const { loading: goalsLoading, error: goalsError, data: goalsData } = useQuery(GET_GOAL);

  const styles = {
    backgroundColor: isDarkMode ? '#000000' : '#ffffff',
    color: isDarkMode ? '#ffffff' : '#000000',
  };
// here we are using the useRef hook to create a reference to the canvas element that we will use to render the chart
  const totalExpenses = expensesData?.me?.expenses?.reduce((total, expense) => total + expense.amount, 0);
  const totalIncome = incomeData?.me?.income?.reduce((total, income) => total + income.amount, 0);
  const totalGoals = goalsData?.me?.goal?.reduce((total, goal) => total + goal.amountToSave, 0);

  const barChartRef = useRef(null); // Create a ref to the bar chart canvas element
  const lineChartRef = useRef(null); // Create a ref to the line graph canvas element

  // This will store the chart instance for the line graph so we can update it later
  useEffect(() => {
    if (barChartRef.current && expensesData && incomeData && goalsData) {
      const ctx = barChartRef.current.getContext('2d');
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
    // if the expensesData, incomeData, and goalsData are all defined, then we can generate the chart
    if (lineChartRef.current && incomeData && expensesData) {
      const hasMultipleMonthsData = checkMultipleMonthsData(incomeData.me.income) || checkMultipleMonthsData(expensesData.me.expenses);
      // if there is data for multiple months, then we will generate a line graph
      if (hasMultipleMonthsData) {
        generateLineChartButtonClicked();
      }
    }
  }, [expensesData, incomeData, goalsData, totalExpenses, totalIncome, totalGoals]);


  // This will check if there is data for multiple months for the given data set (income or expenses)
  const checkMultipleMonthsData = (data) => {
    // This will store the month and year for each item in the data set
    const monthYearSet = new Set();
    // Iterate over all income/expenses and add the month and year to the set 
    for (let item of data) {
      // This will convert the date to a string like "January 2021" 
      const monthYear = new Date(item.createdOn).toLocaleString('default', { month: 'long', year: 'numeric' });
      // Add the month and year to the set 
      monthYearSet.add(monthYear);
    }
    // If there is more than one month and year in the set, then there is data for multiple months
    return monthYearSet.size > 1;
  };


  // This will generate a line graph for the income and expenses data 
  const generateLineChartButtonClicked = () => {
    // Make sure the lineChartRef and incomeData are defined 
    if (!lineChartRef.current || !incomeData || !expensesData) return;

    // This will store total income and expenses per month
    let incomePerMonth = {};
    let expensesPerMonth = {};

    // Iterate over all income
    for (let income of incomeData.me.income) {
      // This will convert the date to a string like "January 2021" 
      let monthYear = new Date(income.createdOn).toLocaleString('default', { month: 'long', year: 'numeric' });
      // If the month and year is not in the incomePerMonth object, then add it and set the value to 0 
      if (!incomePerMonth[monthYear]) incomePerMonth[monthYear] = 0;
      incomePerMonth[monthYear] += income.amount;
      // If the income is recurring, then we need to add the income amount to each month after the createdOn date
      if (income.recurring) {
        let nextMonth = new Date(income.createdOn);
        // Iterate over each month after the createdOn date and add the income amount to the incomePerMonth object
        while (true) {
          nextMonth.setMonth(nextMonth.getMonth() + 1);
          // If the next month is after the current date, then break out of the loop 
          if (nextMonth > new Date()) break;
          // This will convert the date to a string like "January 2021" 
          let nextMonthYear = nextMonth.toLocaleString('default', { month: 'long', year: 'numeric' });
          // If the month and year is not in the incomePerMonth object, then add it and set the value to 0 
          if (!incomePerMonth[nextMonthYear]) incomePerMonth[nextMonthYear] = 0;
          incomePerMonth[nextMonthYear] += income.amount;
        }
      }
    }

    // Do the same for expenses
    for (let expense of expensesData.me.expenses) {
      let monthYear = new Date(expense.createdOn).toLocaleString('default', { month: 'long', year: 'numeric' });
      // If the month and year is not in the expensesPerMonth object, then add it and set the value to 0
      if (!expensesPerMonth[monthYear]) expensesPerMonth[monthYear] = 0;
      expensesPerMonth[monthYear] += expense.amount;
      // If the expense is recurring, then we need to add the expense amount to each month after the createdOn date
      if (expense.recurring) {
        let nextMonth = new Date(expense.createdOn);
        // Iterate over each month after the createdOn date and add the expense amount to the expensesPerMonth object
        while (true) {
          nextMonth.setMonth(nextMonth.getMonth() + 1);
          if (nextMonth > new Date()) break;
          let nextMonthYear = nextMonth.toLocaleString('default', { month: 'long', year: 'numeric' });
          // If the month and year is not in the expensesPerMonth object, then add it and set the value to 0
          if (!expensesPerMonth[nextMonthYear]) expensesPerMonth[nextMonthYear] = 0;
          expensesPerMonth[nextMonthYear] += expense.amount;
        }
      }
    }

    // Generate labels array by taking all unique month-year values and sorting them
    const labels = [...new Set([...Object.keys(incomePerMonth), ...Object.keys(expensesPerMonth)])].sort((a, b) => {
      const dateA = new Date(a);
      const dateB = new Date(b);
      return dateA - dateB;
    });

    // Generate expensesDataset and incomeDataset arrays by getting total expenses and income for each month in labels
    const expensesDataset = labels.map(monthYear => expensesPerMonth[monthYear] || 0);
    const incomeDataset = labels.map(monthYear => incomePerMonth[monthYear] || 0);

    // Generate datasets array for the line chart 
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

    // Generate the line chart 
    const ctx = lineChartRef.current.getContext('2d');
    generateLineChart(ctx, labels, datasets);
  };

  // This will generate a bar graph for the goals data 
  if (expensesLoading || incomeLoading || goalsLoading) return <p>Loading...</p>;
  if (expensesError || incomeError || goalsError) return <p>Error :(</p>;

  return (
    <div>
      <section className="dashboard-section">
        <h2>Welcome to Your Dashboard</h2>
        <div className="finance-info">
          <canvas ref={barChartRef}></canvas>
          {checkMultipleMonthsData(incomeData?.me?.income) || checkMultipleMonthsData(expensesData?.me?.expenses) ? (
            <canvas ref={lineChartRef}></canvas>
          ) : null}
          <p>Total Expenses: ${totalExpenses || 0}</p>
          <p>Total Income: ${totalIncome || 0}</p>
          <p>Total Goals: ${totalGoals || 0}</p>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;