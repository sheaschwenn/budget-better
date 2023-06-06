import React, { useEffect, useContext } from 'react';
import { ThemeContext } from '../utils/ThemeContext';
import { GET_EXPENSES, GET_INCOME, GET_GOAL } from '../utils/queries';
import { useQuery } from '@apollo/client';

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
  const totalGoals = goalsData?.me?.goals?.reduce((total, goal) => total + goal.amountToSave, 0);

  if (expensesLoading || incomeLoading || goalsLoading) return <p>Loading...</p>;
  if (expensesError || incomeError || goalsError) return <p>Error :(</p>;

  return (
    <div style={styles}>
      <section className="dashboard-section">
        <h2>Welcome to Your Dashboard</h2>
        <div className="finance-info">
          <p>Total Expenses: ${totalExpenses || 0}</p>
          <p>Total Income: ${totalIncome || 0}</p>
          <p>Total Goals: ${totalGoals || 0}</p>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;