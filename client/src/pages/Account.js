import React, { useState } from 'react';
import {useMutation} from '@apollo/client'
import { 
  CREATE_EXPENSE,
  CREATE_INCOME,
  CREATE_GOAL
 } from '../utils/mutations';
 import Auth from '../utils/auth'


const Account = () => {
  const [selectedTab, setSelectedTab] = useState('');
  const [expenses, setExpenses] = useState({   
  category: '' ,
  amount: '',
  recurring: false})
  const [income, setIncome] = useState({
    name: '',
    passive: false,
    amount: '',
    recurringOrSalary: false
  })
  const [goal, setGoal] = useState('')

  // need to fix this 
  const [createExpense, {error}] = useMutation(CREATE_EXPENSE)
  const [createIncome, {erro}] = useMutation(CREATE_INCOME)
  const [ createGoal, {err}] = useMutation(CREATE_GOAL)

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handleIncomeSubmit = async(event) => {
    event.preventDefault();
    // Handle income submission logic
    try{
      const {data} = await createIncome({
        variables: {
          name: income.name,
          passive: income.passive,
          amount: parseFloat(income.amount),
          recurringOrSalary: income.recurringOrSalary
        },
      })
      console.log(data)
      setIncome({
        name: '',
        passive: false,
        amount: '',
        recurringOrSalary: false
      })
    }catch (err) {
      console.error(err);
    }

  };

  const handleExpenseSubmit = async (event) => {
    event.preventDefault();
    // Handle expense submission logic
    
    try{
      const {data} = await createExpense({
        variables: {
          category: expenses.category,
          amount: parseFloat(expenses.amount),
          recurring: expenses.recurring
        },
       
      })
      console.log(data)
      setExpenses({
        category: '' ,
       amount: '',
      recurring: false
      })
    }catch (err) {
      console.error(err);
    }

  };
  const handleCheckboxChange = () => {
    setExpenses((prevState) => ({
      ...prevState,
      recurring: !prevState.recurring, // Toggle the value of recurring
    }));
  };
const handleExpensesChange = (event) => {
  const { name, value } = event.target
  setExpenses({
    ...expenses,
    [name]: value,
  });

  // console.log(expenses)
}

const handleIncomeChange = (event) =>{
  const { name, value } = event.target
  setIncome({
    ...income,
    [name]: value,
  });
  console.log(income)
}
  const handleGoalSubmit = (event) => {
    event.preventDefault();
    // Handle goal submission logic
  };

  return (
    <div>

      <h2>Account</h2>

      <div>
        <button onClick={() => handleTabChange('income')}>Income</button>
        {selectedTab === 'income' && (
          <form onSubmit={handleIncomeSubmit}>
            <input 
            type="text" 
            placeholder="Name"
            name= 'name'
            value= {income.name}
            onChange={handleIncomeChange} />
            <label>
              Passive:
              <input 
              type="checkbox" 
              name= 'passive'
              value= {income.passive}
              onChange= {handleIncomeChange}
              />
            </label>
            <input 
            type="number" 
            placeholder="Amount" 
            name= 'amount'
            value= {income.amount}
            onChange= {handleIncomeChange}
            />
            <label>
              Recurring:
              <input 
              type="checkbox" 
              name= 'recurringOrSalary'
              value= {income.recurringOrSalary}
              onChange= {handleIncomeChange}
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
        <button onClick={() => handleTabChange('expenses')}>Expenses</button>
        {selectedTab === 'expenses' && (
          <form onSubmit={handleExpenseSubmit}>
            <input 
            name= 'category'
            type="text" 
            placeholder="Category" 
            value= {expenses.category}
            onChange={handleExpensesChange}
            />
            <input 
            name= 'amount'
            type="number" 
            placeholder="Amount" 
            value= {expenses.amount}
            onChange={handleExpensesChange }
            />
             <label>
              Recurring:
              <input
              name= 'recurring'
                type="checkbox"
                checked={expenses.recurring}
                onChange={handleCheckboxChange}
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
        <button onClick={() => handleTabChange('goals')}>Goals</button>
        {selectedTab === 'goals' && (
          <form onSubmit={handleGoalSubmit}>
            <input type="text" placeholder="Name" />
            <input type="number" placeholder="Amount to Save" />
            <input type="date" placeholder="Deadline" />
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Account;