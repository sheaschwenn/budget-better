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
  UPDATE_EXPENSE,
  UPDATE_GOAL,
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
    _id: "",
    name: "",
    passive: false,
    amount: "",
    recurring: false,
  });

  const [goal, setGoal] = useState({
    name: "",
    amountToSave: "",
    byDate: "",
    shortTerm: false,
  });

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
  };

  const handleTabClose = (tab) => {
    setSelectedTab("");
    console.log("this happeened");
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
        _id: "",
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
        byDate: "",
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

  const [editIncome, setEditIncome] = useState("");
  const [edit, setEdit] = useState({});

  const [updateIncome] = useMutation(UPDATE_INCOME, {
    refetchQueries: [{ query: GET_ME }],
  });

  const handleIncomeEdit = async (event, incomeId) => {
    event.preventDefault();
    try {
      const { data } = await updateIncome({
        variables: {
          incomeId: incomeId,
          name: editIncome.name,
          passive: editIncome.passive,
          amount: parseFloat(editIncome.amount),
          recurring: editIncome.recurring,
        },
      });
      setEdit(false);
    } catch (err) {
      console.error(err);
    }
  };
  const [editExpense, setEditExpense] = useState("");
  const [updateExpense] = useMutation(UPDATE_EXPENSE, {
    refetchQueries: [{ query: GET_ME }],
  });
  const handleExpenseEdit = async (event, expenseId) => {
    event.preventDefault();
    try {
      const { data } = await updateExpense({
        variables: {
          expenseId: expenseId,
          category: editExpense.category,
          amount: parseFloat(editExpense.amount),
          recurring: editExpense.recurring,
        },
      });
      setEdit(false);
    } catch (err) {
      console.error(err);
    }
  };

  const [editGoal, setEditGoal] = useState("");
  const [updateGoal] = useMutation(UPDATE_GOAL, {
    refetchQueries: [{ query: GET_ME }],
  });
  const handleGoalEdit = async (event, goalId) => {
    event.preventDefault();
    try {
      const { data } = await updateGoal({
        variables: {
          goalId: goalId,
          name: editGoal.name,
          amountToSave: parseFloat(editGoal.amountToSave),
          byDate: editGoal.byDate,
          shortTerm: editGoal.shortTerm,
        },
      });
      setEdit(false);
    } catch (err) {
      console.error(err);
    }
  };

  const styles = {
    backgroundColor: isDarkMode ? "#192734" : "#ffffff",
    color: isDarkMode ? "#ffffff" : "#192734",
  };
  const styles1 = {
    backgroundColor: isDarkMode ? "#192734" : "#ffffff",
    color: isDarkMode ? "#ffffff" : "#192734",
    minHeight: "100vh",
  };

  return (
    <div style={styles1} className=" z-50 bg-white shadow p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Account</h2>

      <div className="mb-4">
        <button
          className="border border-gray-300 py-2 px-4 rounded w-full"
          onClick={() => handleTabChange("income")}
        >
          Income
        </button>
        {selectedTab === "income" && (
          <div>
            <button
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-red-500 shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
              onClick={() => handleTabClose("income")}
            >
              Close
            </button>
            <form className="mt-4" onSubmit={handleIncomeSubmit}>
              <input
                className="border border-gray-300 p-2 w-full mb-2 rounded focus:outline-none"
                type="text"
                placeholder="Name"
                name="name"
                value={income.name}
                onChange={handleIncomeChange}
              />
              <label className="flex items-center mt-2">
                Passive:
                <input
                  className="ml-2 form-checkbox text-indigo-600"
                  type="checkbox"
                  name="passive"
                  checked={income.passive}
                  onChange={handleIncomeCheckboxChange}
                />
              </label>
              <input
                className="border border-gray-300 p-2 w-full mb-2 rounded focus:outline-none"
                type="number"
                placeholder="Amount"
                name="amount"
                value={income.amount}
                onChange={handleIncomeChange}
              />
              <label className="flex items-center mt-2">
                Recurring:
                <input
                  className="ml-2 form-checkbox text-indigo-600"
                  type="checkbox"
                  name="recurring"
                  checked={income.recurring}
                  onChange={handleIncomeCheckboxChange}
                />
              </label>
              <button
                className="bg-indigo-600 text-lime-500 py-3 px-4 rounded-md mt-2 text-lg focus:outline-none hover:bg-indigo-500"
                type="submit"
              >
                Submit
              </button>
            </form>

            <IncomeList
              getIncome={getIncome}
              handleDelete={handleDelete}
              handleIncomeEdit={handleIncomeEdit}
              editIncome={editIncome}
              setEditIncome={setEditIncome}
              edit={edit}
              setEdit={setEdit}
            />
          </div>
        )}
      </div>

      {/* --- Expenses section --- */}
      <div className="mb-4">
        <button
          className="border border-gray-300 py-2 px-4 rounded w-full"
          onClick={() => handleTabChange("expenses")}
        >
          Expenses
        </button>
        {selectedTab === "expenses" && (
          <div>
            <button
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-red-500 shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
              onClick={() => handleTabClose("expenses")}
            >
              Close
            </button>
            <form className="mt-4" onSubmit={handleExpenseSubmit}>
              <input
                className="border border-gray-300 p-2 w-full mb-2 rounded focus:outline-none"
                type="text"
                placeholder="Category"
                name="category"
                value={expenses.category}
                onChange={handleExpensesChange}
              />
              <input
                className="border border-gray-300 p-2 w-full mb-2 rounded focus:outline-none"
                type="number"
                placeholder="Amount"
                name="amount"
                value={expenses.amount}
                onChange={handleExpensesChange}
              />
              <label className="flex items-center mt-2">
                Recurring:
                <input
                  className="ml-2 form-checkbox text-indigo-600"
                  type="checkbox"
                  name="recurring"
                  checked={expenses.recurring}
                  onChange={handleExpenseCheckboxChange}
                />
              </label>
              <button
                className="bg-indigo-600 text-lime-500 py-3 px-4 rounded-md mt-2 text-lg focus:outline-none hover:bg-indigo-500"
                type="submit"
              >
                Submit
              </button>
            </form>
            <ExpensesList
              expensesList={getExpenses}
              handleExpenseDelete={handleExpenseDelete}
              handleExpenseEdit={handleExpenseEdit}
              editExpense={editExpense}
              setEditExpense={setEditExpense}
              edit={edit}
              setEdit={setEdit}
            />
          </div>
        )}
      </div>

      {/* --- Goals section --- */}
      <div className="mb-4">
        <button
          className="border border-gray-300 py-2 px-4 rounded w-full"
          onClick={() => handleTabChange("goals")}
        >
          Goals
        </button>
        {selectedTab === "goals" && (
          <div>
            <button
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-red-500 shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
              onClick={() => handleTabClose("goals")}
            >
              Close
            </button>
            <form className="mt-4" onSubmit={handleGoalSubmit}>
              <input
                className="border border-gray-300 p-2 w-full mb-2 rounded focus:outline-none"
                type="text"
                placeholder="Name"
                name="name"
                value={goal.name}
                onChange={handleGoalChange}
              />
              <input
                className="border border-gray-300 p-2 w-full mb-2 rounded focus:outline-none"
                type="number"
                placeholder="Amount to Save"
                name="amountToSave"
                value={goal.amountToSave}
                onChange={handleGoalChange}
              />
              <input
                className="border border-gray-300 p-2 w-full mb-2 rounded focus:outline-none"
                type="date"
                placeholder="Deadline"
                name="byDate"
                value={goal.byDate}
                onChange={handleGoalChange}
              />
              <label className="flex items-center mt-2">
                Short Term:
                <input
                  className="ml-2 form-checkbox text-indigo-600"
                  type="checkbox"
                  name="shortTerm"
                  checked={goal.shortTerm}
                  onChange={handleGoalCheckboxChange}
                />
              </label>
              <button
                className="bg-indigo-600 text-lime-500 py-3 px-4 rounded-md mt-2 text-lg focus:outline-none hover:bg-indigo-500"
                type="submit"
              >
                Submit
              </button>
            </form>
            <GoalList
              goalList={getGoals}
              handleGoalDelete={handleGoalDelete}
              handleGoalEdit={handleGoalEdit}
              editGoal={editGoal}
              setEditGoal={setEditGoal}
              edit={edit}
              setEdit={setEdit}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;
