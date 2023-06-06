import Navbar from "../components/Navbar";
import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_EXPENSE, CREATE_INCOME, CREATE_GOAL } from "../utils/mutations";
import Auth from "../utils/auth";
import { ThemeContext } from "../utils/ThemeContext";

import Footer from "../components/Footer";
const Account = () => {
  const [selectedTab, setSelectedTab] = useState("");
  const { isDarkMode } = useContext(ThemeContext);

  const [expenses, setExpenses] = useState({
    category: "",
    amount: "",
    recurring: false,
  });

  const [income, setIncome] = useState({
    name: "",
    passive: false,
    amount: "",
    recurringOrSalary: false,
  });

  const [goal, setGoal] = useState({
    name: "",
    amountToSave: "",
    byDate: "2023-06-07",
    shortTerm: false,
  });

  // need to fix this
  const [createExpense] = useMutation(CREATE_EXPENSE);
  const [createIncome] = useMutation(CREATE_INCOME);
  const [createGoal] = useMutation(CREATE_GOAL);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handleIncomeSubmit = async (event) => {
    event.preventDefault();
    // Handle income submission logic
    try {
      const { data } = await createIncome({
        variables: {
          name: income.name,
          passive: income.passive,
          amount: parseFloat(income.amount),
          recurringOrSalary: income.recurringOrSalary,
        },
      });
      console.log(data);
      setIncome({
        name: "",
        passive: false,
        amount: "",
        recurringOrSalary: false,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleExpenseSubmit = async (event) => {
    event.preventDefault();
    // Handle expense submission logic

    try {
      const { data } = await createExpense({
        variables: {
          category: expenses.category,
          amount: parseFloat(expenses.amount),
          recurring: expenses.recurring,
        },
      });
      console.log(data);
      setExpenses({
        category: "",
        amount: "",
        recurring: false,
      });
    } catch (err) {
      console.error(err);
    }
  };
  const handleExpenseCheckboxChange = (event) => {
    const { checked } = event.target;
    setExpenses((prevState) => ({
      ...prevState,
      recurring: checked,
    }));
  };

  const handleExpensesChange = (event) => {
    const { name, value } = event.target;
    setExpenses({
      ...expenses,
      [name]: value,
    });

    console.log(expenses);
  };

  const handleIncomeChange = (event) => {
    const { name, value } = event.target;
    setIncome({
      ...income,
      [name]: value,
    });
    console.log(income);
  };
  const handleIncomeCheckboxChange = (event) => {
    const { checked } = event.target;
    if (event.target.name === "passive") {
      setIncome((prevState) => ({
        ...prevState,
        passive: checked,
      }));
    } else if (event.target.name === "recurringOrSalary") {
      setIncome((prevState) => ({
        ...prevState,
        recurringOrSalary: checked,
      }));
    }
  };

  const handleGoalSubmit = async (event) => {
    event.preventDefault();
    // Handle goal submission logic
    try {
      const { data } = await createGoal({
        variables: {
          name: goal.name,
          amountToSave: parseFloat(goal.amountToSave),
          byDate: goal.byDate,
          shortTerm: goal.shortTerm,
        },
      });
      console.log(data);
      setGoal({
        name: "",
        amountToSave: "",
        byDate: "2023-06-07",
        shortTerm: false,
      });
    } catch {}
  };

  const handleGoalChange = (event) => {
    const { name, value } = event.target;
    setGoal({
      ...goal,
      [name]: value,
    });
    console.log(goal);
  };

  const handleGoalCheckboxChange = (event) => {
    const { checked } = event.target;
    setGoal((prevState) => ({
      ...prevState,
      shortTerm: checked,
    }));
  };

  const styles = {
    backgroundColor: isDarkMode ? "#000000" : "#ffffff",
    color: isDarkMode ? "#ffffff" : "#000000",
  };

  return (
    <div style={styles}>
      <h2>Account</h2>

      <div>
        <button onClick={() => handleTabChange("income")}>Income</button>
        {selectedTab === "income" && (
          <form onSubmit={handleIncomeSubmit}>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={income.name}
              onChange={handleIncomeChange}
            />
            <label>
              Passive:
              <input
                type="checkbox"
                name="passive"
                checked={income.passive}
                onChange={handleIncomeCheckboxChange}
              />
            </label>
            <input
              type="number"
              placeholder="Amount"
              name="amount"
              value={income.amount}
              onChange={handleIncomeChange}
            />
            <label>
              Recurring:
              <input
                type="checkbox"
                name="recurringOrSalary"
                checked={income.recurringOrSalary}
                onChange={handleIncomeCheckboxChange}
              />
            </label>
            <label>
              Frequency:
              <select>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </label>
            <button type="submit">Submit</button>
          </form>
        )}
      </div>

      <div>
        <button onClick={() => handleTabChange("expenses")}>Expenses</button>
        {selectedTab === "expenses" && (
          <form onSubmit={handleExpenseSubmit}>
            <input
              name="category"
              type="text"
              placeholder="Category"
              value={expenses.category}
              onChange={handleExpensesChange}
            />
            <input
              name="amount"
              type="number"
              placeholder="Amount"
              value={expenses.amount}
              onChange={handleExpensesChange}
            />
            <label>
              Recurring:
              <input
                name="recurring"
                type="checkbox"
                checked={expenses.recurring}
                onChange={handleExpenseCheckboxChange}
              />
            </label>
            <label>
              Frequency:
              <select>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </label>
            <button type="submit">Submit</button>
          </form>
        )}
      </div>

      <div>
        <button onClick={() => handleTabChange("goals")}>Goals</button>
        {selectedTab === "goals" && (
          <form onSubmit={handleGoalSubmit}>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={goal.name}
              onChange={handleGoalChange}
            />
            <input
              type="number"
              placeholder="Amount to Save"
              name="amountToSave"
              value={goal.amountToSave}
              onChange={handleGoalChange}
            />
            <input
              type="date"
              placeholder="Deadline"
              name="byDate"
              value={goal.byDate}
              onChange={handleGoalChange}
            />

            <label>
              Short Term:
              <input
                name="shortTerm"
                type="checkbox"
                checked={goal.shortTerm}
                onChange={handleGoalCheckboxChange}
              />
            </label>
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Account;
