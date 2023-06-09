import React, { useState, useContext } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_EXPENSE,
  CREATE_INCOME,
  CREATE_GOAL,
  DELETE_INCOME,
  DELETE_EXPENSE,
  DELETE_GOAL,
  UPDATE_INCOME,
} from "../utils/mutations";

import { GET_ME } from "../utils/queries";
import Auth from "../utils/auth";
import { ThemeContext } from "../utils/ThemeContext";

import IncomeList from "../components/IncomeList";
import ExpensesList from "../components/ExpesnesList";
import GoalList from "../components/GoalList";

const Account = () => {
  const [selectedTab, setSelectedTab] = useState("");
  const { isDarkMode } = useContext(ThemeContext);

  const { loading, data } = useQuery(GET_ME);
  const getIncome = data?.me.income || [];
  const getExpenses = data?.me.expenses || [];
  const getGoals = data?.me.goal || [];

  const [expenses, setExpenses] = useState({
    category: "",
    amount: "",
    recurring: false,
  });

  const [income, setIncome] = useState({
    name: "",
    passive: false,
    amount: "",
    recurring: false,
  });

  const [goal, setGoal] = useState({
    name: "",
    amountToSave: "",
    byDate: "2023-06-07",
    shortTerm: false,
  });

  // need to fix this
  const [createExpense] = useMutation(CREATE_EXPENSE, {
    refetchQueries: [{ query: GET_ME }],
  });
  const [createIncome] = useMutation(CREATE_INCOME, {
    refetchQueries: [{ query: GET_ME }],
  });
  const [createGoal] = useMutation(CREATE_GOAL, {
    refetchQueries: [{ query: GET_ME }],
  });

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    console.log(data);
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
          recurring: income.recurring,
        },
      });
      console.log(data);
      console.log(getIncome);

      setIncome({
        name: "",
        passive: false,
        amount: "",
        recurring: false,
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
  };
  const handleIncomeCheckboxChange = (event) => {
    const { checked } = event.target;
    if (event.target.name === "passive") {
      setIncome((prevState) => ({
        ...prevState,
        passive: checked,
      }));
    } else if (event.target.name === "recurring") {
      setIncome((prevState) => ({
        ...prevState,
        recurring: checked,
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

  const [deleteIncome] = useMutation(DELETE_INCOME, {
    refetchQueries: [{ query: GET_ME }],
  });

  const handleDelete = async (incomeId) => {
    try {
      const { data } = await deleteIncome({
        variables: { incomeId },
        // refetchQueries: [{query: GET_ME}]
      });
      console.log(getIncome);
    } catch (err) {
      console.error(err);
    }
  };

  const [deleteExpense] = useMutation(DELETE_EXPENSE, {
    refetchQueries: [{ query: GET_ME }],
  });

  const handleExpenseDelete = async (expenseId) => {
    try {
      const { data } = await deleteExpense({
        variables: { expenseId },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const [deleteGoal] = useMutation(DELETE_GOAL, {
    refetchQueries: [{ query: GET_ME }],
  });
  const handleGoalDelete = async (goalId) => {
    try {
      const { data } = await deleteGoal({
        variables: { goalId },
      });
    } catch (err) {
      console.error(err);
    }
  };
  const [editedIncome, setEditedIncome] = useState("");
  const incomeEdit = (income) => {
    setEditedIncome(income);
  };

  const [updateIncome] = useMutation(UPDATE_INCOME, {
    refetchQueries: [{ query: GET_ME }],
  });
  const handleIncomeEdit = async (editedIncome) => {
    try {
      const { data } = await updateIncome({
        variables: {
          incomeId: editedIncome._id,
          name: editedIncome.name,
          passive: editedIncome.passive,
          amount: parseFloat(editedIncome.amount),
          recurring: editedIncome.recurring,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const styles = {
    backgroundColor: isDarkMode ? "#000000" : "#ffffff",
    color: isDarkMode ? "#ffffff" : "#000000",
  };

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      <h2 className="text-xl font-bold mb-4">Account</h2>

      <div className="mb-4">
        <button
          className="border border-gray-300 py-2 px-4 rounded"
          onClick={() => handleTabChange("income")}
        >
          Income
        </button>
        {selectedTab === "income" && (
          <div>
            <form className="mt-4" onSubmit={handleIncomeSubmit}>
              <input
                className="border border-gray-300 p-2 w-full mb-2 rounded"
                type="text"
                placeholder="Name"
                name="name"
                value={income.name}
                onChange={handleIncomeChange}
              />
              <label className="flex items-center mt-2">
                Passive:
                <input
                  className="ml-2"
                  type="checkbox"
                  name="passive"
                  checked={income.passive}
                  onChange={handleIncomeCheckboxChange}
                />
              </label>
              <input
                className="border border-gray-300 p-2 w-full mb-2 rounded"
                type="number"
                placeholder="Amount"
                name="amount"
                value={income.amount}
                onChange={handleIncomeChange}
              />
              <label className="flex items-center mt-2">
                Recurring:
                <input
                  className="ml-2"
                  type="checkbox"
                  name="recurring"
                  checked={income.recurring}
                  onChange={handleIncomeCheckboxChange}
                />
              </label>
              <label className="flex items-center mt-2">
                Frequency:
                <select
                  className="border border-gray-300 p-2 rounded"
                  name="frequency"
                >
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </label>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded mt-2"
                type="submit"
              >
                Submit
              </button>
            </form>
            <IncomeList
              getIncome={getIncome}
              handleDelete={handleDelete}
              handleIncomeEdit={handleIncomeEdit}
              handleIncomeCheckboxChange={handleIncomeCheckboxChange}
              handleIncomeChange={handleIncomeChange}
              incomeEdit={incomeEdit}
            />
          </div>
        )}
      </div>

      <div className="mb-4">
        <button
          className="border border-gray-300 py-2 px-4 rounded"
          onClick={() => handleTabChange("expenses")}
        >
          Expenses
        </button>
        {selectedTab === "expenses" && (
          <div>
            <form className="mt-4" onSubmit={handleExpenseSubmit}>
              <input
                className="border border-gray-300 p-2 w-full mb-2 rounded"
                name="category"
                type="text"
                placeholder="Category"
                value={expenses.category}
                onChange={handleExpensesChange}
              />
              <input
                className="border border-gray-300 p-2 w-full mb-2 rounded"
                name="amount"
                type="number"
                placeholder="Amount"
                value={expenses.amount}
                onChange={handleExpensesChange}
              />
              <label className="flex items-center mt-2">
                Recurring:
                <input
                  className="ml-2"
                  name="recurring"
                  type="checkbox"
                  checked={expenses.recurring}
                  onChange={handleExpenseCheckboxChange}
                />
              </label>
              <label className="flex items-center mt-2">
                Frequency:
                <select
                  className="border border-gray-300 p-2 rounded"
                  name="frequency"
                >
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </label>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded mt-2"
                type="submit"
              >
                Submit
              </button>
            </form>
            <ExpensesList
              expensesList={getExpenses}
              handleExpenseDelete={handleExpenseDelete}
            />
          </div>
        )}
      </div>

      <div className="mb-4">
        <button
          className="border border-gray-300 py-2 px-4 rounded"
          onClick={() => handleTabChange("goals")}
        >
          Goals
        </button>
        {selectedTab === "goals" && (
          <div>
            <form className="mt-4" onSubmit={handleGoalSubmit}>
              <input
                className="border border-gray-300 p-2 w-full mb-2 rounded"
                type="text"
                placeholder="Name"
                name="name"
                value={goal.name}
                onChange={handleGoalChange}
              />
              <input
                className="border border-gray-300 p-2 w-full mb-2 rounded"
                type="number"
                placeholder="Amount to Save"
                name="amountToSave"
                value={goal.amountToSave}
                onChange={handleGoalChange}
              />
              <input
                className="border border-gray-300 p-2 w-full mb-2 rounded"
                type="date"
                placeholder="Deadline"
                name="byDate"
                value={goal.byDate}
                onChange={handleGoalChange}
              />

              <label className="flex items-center mt-2">
                Short Term:
                <input
                  className="ml-2"
                  name="shortTerm"
                  type="checkbox"
                  checked={goal.shortTerm}
                  onChange={handleGoalCheckboxChange}
                />
              </label>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded mt-2"
                type="submit"
              >
                Submit
              </button>
            </form>
            <GoalList goalList={getGoals} handleGoalDelete={handleGoalDelete} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;
