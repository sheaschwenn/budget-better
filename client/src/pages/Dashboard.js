import React, { useEffect, useContext, useRef } from "react";
import { ThemeContext } from "../utils/ThemeContext";
import { GET_EXPENSES, GET_INCOME, GET_GOAL } from "../utils/queries";

import { useQuery } from "@apollo/client";
import { generateGroupedBarChart, generateLineChart } from "../utils/chart";

const Dashboard = () => {
  // declare variables for the data we will be using to generate the charts
  const {
    loading: expensesLoading,
    error: expensesError,
    data: expensesData,
  } = useQuery(GET_EXPENSES);
  const {
    loading: incomeLoading,
    error: incomeError,
    data: incomeData,
  } = useQuery(GET_INCOME);
  const {
    loading: goalsLoading,
    error: goalsError,
    data: goalsData,
  } = useQuery(GET_GOAL);

  const { isDarkMode } = useContext(ThemeContext);
  const styles = {
    backgroundColor: isDarkMode ? "#192734" : "#ffffff",
    color: isDarkMode ? "#ffffff" : "#121212",
  };
  // here we are using the useRef hook to create a reference to the canvas element that we will use to render the chart
  const totalExpenses = expensesData?.me?.expenses?.reduce(
    (total, expense) => total + expense.amount,
    0
  );
  const totalIncome = incomeData?.me?.income?.reduce(
    (total, income) => total + income.amount,
    0
  );
  const totalGoals = goalsData?.me?.goal?.reduce(
    (total, goal) => total + goal.amountToSave,
    0
  );

  const barChartRef = useRef(null); // Create a ref to the bar chart canvas element
  const lineChartRef = useRef(null); // Create a ref to the line graph canvas element

  // This will store the chart instance for the line graph so we can update it later
  useEffect(() => {
    if (barChartRef.current && expensesData && incomeData && goalsData) {
      const ctx = barChartRef.current.getContext("2d");
      const labels = ["Your Financial Data"];
      const datasets = [
        {
          label: "Expenses",
          data: [totalExpenses],
          backgroundColor: ["#ff6b6b"],
        },
        {
          label: "Income",
          data: [totalIncome],
          backgroundColor: ["#63b3ed"],
        },
        {
          label: "Goals",
          data: [totalGoals],
          backgroundColor: ["#48bb78"],
        },
      ];
      generateGroupedBarChart(ctx, labels, datasets);
    }
    // if the expensesData, incomeData, and goalsData are all defined, then we can generate the chart
    if (lineChartRef.current && incomeData && expensesData) {
      const hasMultipleMonthsData =
        checkMultipleMonthsData(incomeData.me.income) ||
        checkMultipleMonthsData(expensesData.me.expenses);
      // if there is data for multiple months, then we will generate a line graph
      if (hasMultipleMonthsData) {
        generateLineChartButtonClicked();
      }
    }
  }, [
    expensesData,
    incomeData,
    goalsData,
    totalExpenses,
    totalIncome,
    totalGoals,
  ]);

  // This will check if there is data for multiple months for the given data set (income or expenses)
  const checkMultipleMonthsData = (data) => {
    // This will store the month and year for each item in the data set
    const monthYearSet = new Set();
    // Iterate over all income/expenses and add the month and year to the set
    for (let item of data) {
      // This will convert the date to a string like "January 2021"
      const monthYear = new Date(item.createdOn).toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
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
      let monthYear = new Date(income.createdOn).toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
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
          let nextMonthYear = nextMonth.toLocaleString("default", {
            month: "long",
            year: "numeric",
          });
          // If the month and year is not in the incomePerMonth object, then add it and set the value to 0
          if (!incomePerMonth[nextMonthYear]) incomePerMonth[nextMonthYear] = 0;
          incomePerMonth[nextMonthYear] += income.amount;
        }
      }
    }

    // Do the same for expenses
    for (let expense of expensesData.me.expenses) {
      let monthYear = new Date(expense.createdOn).toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
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
          let nextMonthYear = nextMonth.toLocaleString("default", {
            month: "long",
            year: "numeric",
          });
          // If the month and year is not in the expensesPerMonth object, then add it and set the value to 0
          if (!expensesPerMonth[nextMonthYear])
            expensesPerMonth[nextMonthYear] = 0;
          expensesPerMonth[nextMonthYear] += expense.amount;
        }
      }
    }

    // Generate labels array by taking all unique month-year values and sorting them
    const labels = [
      ...new Set([
        ...Object.keys(incomePerMonth),
        ...Object.keys(expensesPerMonth),
      ]),
    ].sort((a, b) => {
      const dateA = new Date(a);
      const dateB = new Date(b);
      return dateA - dateB;
    });

    // Generate expensesDataset and incomeDataset arrays by getting total expenses and income for each month in labels
    const expensesDataset = labels.map(
      (monthYear) => expensesPerMonth[monthYear] || 0
    );
    const incomeDataset = labels.map(
      (monthYear) => incomePerMonth[monthYear] || 0
    );

    // Generate datasets array for the line chart
    const datasets = [
      {
        label: "Expenses",
        data: expensesDataset,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      {
        label: "Income",
        data: incomeDataset,
        fill: false,
        borderColor: "#741b47",
        tension: 0.1,
      },
    ];

    // Generate the line chart
    const ctx = lineChartRef.current.getContext("2d");
    generateLineChart(ctx, labels, datasets);
  };

  // This will generate a bar graph for the goals data
  if (expensesLoading || incomeLoading || goalsLoading)
    return <p>Loading...</p>;
  if (expensesError || incomeError || goalsError) return <p>Error :(</p>;

  const activities = [];

  if (expensesData && expensesData.me && expensesData.me.expenses) {
    const expenses = expensesData.me.expenses.slice(0, 3);
    expenses.forEach((expense) => {
      activities.push({
        id: expense.id,
        title: expense.category,
        date: expense.createdOn,
        amount: expense.amount,
      });
      console.log(activities);
    });
  }

  if (incomeData && incomeData.me && incomeData.me.income) {
    const incomes = incomeData.me.income.slice(0, 3);
    incomes.forEach((income) => {
      activities.push({
        id: income.id,
        title: income.name,
        date: income.createdOn,
        amount: income.amount,
      });
    });
  }

  const totalSavings = totalIncome - totalExpenses;
  const monthsToReachGoal = Math.ceil(totalGoals / totalSavings);

  return (
    <div style={styles} className=" z-50 min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          <div className="grid grid-cols-2 gap-8">
            <div className="col-span-1">
              <div
                style={styles}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="p-5">
                  <h3 className="text-lg leading-6 font-medium">
                    Financial Overview
                  </h3>
                  <div className="mt-5">
                    <canvas ref={barChartRef}></canvas>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-1 grid grid-cols-1 gap-8">
              <div
                style={styles}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="p-5">
                  <h3 className="text-lg leading-6 font-medium">Income</h3>
                  <div className="mt-2">
                    <p className="text-3xl font-semibold">
                      ${totalIncome || 0}
                    </p>
                  </div>
                </div>
              </div>
              <div
                style={styles}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="p-5">
                  <h3 className="text-lg leading-6 font-medium">Expenses</h3>
                  <div className="mt-2">
                    <p className="text-3xl font-semibold">
                      ${totalExpenses || 0}
                    </p>
                  </div>
                </div>
              </div>
              <div
                style={styles}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="p-5">
                  <h3 className="text-lg leading-6 font-medium">Savings</h3>
                  <div className="mt-2">
                    <p className="text-3xl font-semibold">
                      ${totalSavings || 0}
                    </p>
                  </div>
                </div>
              </div>
              <div
                style={styles}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="p-5">
                  <h3 className="text-lg leading-6 font-medium">
                    Months to Goal
                  </h3>
                  <div className="mt-2">
                    <p className="text-3xl font-semibold">
                      {monthsToReachGoal}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-8">
            <div
              style={styles}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-5">
                <h3 className="text-lg leading-6 font-medium">
                  Income vs Expenses
                </h3>
                <div className="mt-5">
                  <canvas ref={lineChartRef}></canvas>
                </div>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg flex-grow">
              <div style={styles} className="p-5 h-full">
                <h3 className="text-lg leading-6 font-medium">
                  Recent Activities
                </h3>
                <div className="mt-2 overflow-y-auto">
                  <ul className="divide-y divide-gray-200">
                    {activities.slice(0, 3).map((activity) => {
                      const formattedDate = new Date(
                        activity.date
                      ).toLocaleDateString();

                      return (
                        <li key={activity.id} className="py-4">
                          <div className="flex space-x-3">
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <h3 className="text-base font-medium">
                                  {activity.title}
                                </h3>
                                <p className="text-base">{`- $${activity.amount}`}</p>
                              </div>
                              <p className="text-base">{formattedDate}</p>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
