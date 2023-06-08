import React, { useState, useContext } from 'react';
import {useMutation, useQuery} from '@apollo/client'
import { 
  CREATE_EXPENSE,
  CREATE_INCOME,
  CREATE_GOAL,
  DELETE_INCOME,
  DELETE_EXPENSE,
  DELETE_GOAL,
  UPDATE_INCOME
 } from '../utils/mutations';

 import {  GET_ME } from '../utils/queries';
 import Auth from '../utils/auth'
 import { ThemeContext} from '../utils/ThemeContext'


 import IncomeList from '../components/IncomeList'
 import ExpensesList from '../components/ExpesnesList'
 import GoalList from '../components/GoalList';

const Account = () => {
  const [selectedTab, setSelectedTab] = useState('');
  const { isDarkMode } = useContext(ThemeContext);


 

  const{loading, data} = useQuery(GET_ME)
  const getIncome = data?.me.income || []
  const getExpenses = data?.me.expenses || []
  const getGoals = data?.me.goal || []

  const [expenses, setExpenses] = useState({   
  category: '' ,
  amount: '',
  recurring: false})

  const [income, setIncome] = useState({
    _id: "",
    name: '',
    passive: false,
    amount: '',
    recurring: false
  })
  
  const [goal, setGoal] = useState({
    name: '',
    amountToSave: '',
    byDate: '2023-06-07',
    shortTerm: false
  })

  // need to fix this 
  const [createExpense] = useMutation(CREATE_EXPENSE, {
    refetchQueries: [{query: GET_ME}]
  })
  const [createIncome] = useMutation(CREATE_INCOME, {
    refetchQueries: [{query: GET_ME}]
  })
  const [createGoal] = useMutation(CREATE_GOAL, {
    refetchQueries: [{query: GET_ME}]
  })

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    console.log(data)
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
          recurring: income.recurring
        },
      })
      console.log(data)
      console.log(getIncome)


  
      setIncome({
        _id: '',
        name: '',
        passive: false,
        amount: '',
        recurring: false
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
  const handleExpenseCheckboxChange = (event) => {
    const { checked } = event.target;
    setExpenses((prevState) => ({
      ...prevState,
      recurring: checked,
    }));
  };
  
const handleExpensesChange = (event) => {
  const { name, value } = event.target
  setExpenses({
    ...expenses,
    [name]: value,
  });

  console.log(expenses)
}

const handleIncomeChange = (event) =>{
  const { name, value } = event.target
  setIncome({
    ...income,
    [name]: value,
  });
  
}
const handleIncomeCheckboxChange = (event) => {
  const { checked } = event.target;
  if(event.target.name === 'passive'){
  setIncome((prevState) => ({
    ...prevState,
    passive: checked,
  })
  );}
  else if(event.target.name === 'recurring'){
    setIncome((prevState) => ({
      ...prevState,
      recurring: checked,
    }))
  }
};

  const handleGoalSubmit = async(event) => {
    event.preventDefault();
    // Handle goal submission logic
    try{
      const {data} = await createGoal({
        variables: {
          name: goal.name,
          amountToSave: parseFloat(goal.amountToSave),
          byDate: goal.byDate,
          shortTerm: goal.shortTerm
        }
        
      })
      setGoal({
        name: '',
        amountToSave: '',
        byDate:'2023-06-07',
        shortTerm: false
      })
    }catch{

    }
  };

  const handleGoalChange = (event) => {
    const {name, value} = event.target
    setGoal({
      ...goal,
      [name]: value
    })
    console.log(goal)
    
  }

  const handleGoalCheckboxChange = (event) => {
    const { checked } = event.target;
    setGoal((prevState) => ({
      ...prevState,
      shortTerm: checked,
    }));
  };

  const [deleteIncome] = useMutation(DELETE_INCOME, {refetchQueries: [{query: GET_ME}]})

  const handleDelete = async(incomeId) =>{
      try{
          const {data} = await deleteIncome({
              variables: {incomeId},
              // refetchQueries: [{query: GET_ME}]
      })
      console.log(getIncome)

      }catch(err){
          console.error(err);
      }
  }


const [deleteExpense] = useMutation(DELETE_EXPENSE, {refetchQueries: [{query: GET_ME}]})

const handleExpenseDelete = async(expenseId) => {
  try{
    const{data} = await deleteExpense({
      variables: {expenseId}
    })
  }catch(err){
    console.error(err)
  }
}

const [deleteGoal] = useMutation(DELETE_GOAL, {refetchQueries: [{query: GET_ME}]})
const handleGoalDelete = async(goalId) => {
  try{
    const{data} = await deleteGoal({
      variables: {goalId}
    })
  }catch(err){
    console.error(err)
  }
}
const [editIncome, setEditIncome] = useState("")
const [edit, setEdit] = useState({})
const incomeEdit = (income) => {
  setEditIncome(income)

}

const [updateIncome] = useMutation(UPDATE_INCOME, {refetchQueries: [{query: GET_ME}]})

const handleIncomeEdit = async(event, incomeId) =>{
  event.preventDefault();
  console.log("editIncome", "id",editIncome._id, editIncome.name, editIncome.passive, editIncome.amount, editIncome.recurring )
  try{
    const{data} = await updateIncome({
        variables: {
          incomeId: incomeId,
          name: editIncome.name,
          passive: editIncome.passive,
          amount: parseFloat(editIncome.amount),
          recurring: editIncome.recurring
        },
        
    })
    setEdit(false)
  
  }catch(err){
    console.error(err)
  }

}

  const styles = {
    backgroundColor: isDarkMode ? '#000000' : '#ffffff',
    color: isDarkMode ? '#ffffff' : '#000000',
  };

  return (
    <div >
      <h2>Account</h2>

      <div>
        <button onClick={() => handleTabChange('income')}>Income</button>
        {selectedTab === 'income' && (
          <div>
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
              checked= {income.passive}
              onChange= {handleIncomeCheckboxChange}
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
              name= 'recurring'
              checked= {income.recurring}
              onChange= {handleIncomeCheckboxChange}
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
          <IncomeList 
          getIncome={getIncome} 
          handleDelete={handleDelete} 
          handleIncomeEdit= {handleIncomeEdit}  
          handleIncomeChange= {handleIncomeChange} 
          incomeEdit = {incomeEdit} 
          editIncome={editIncome} 
          setEditIncome={setEditIncome}
          edit= {edit}
          setEdit= {setEdit}
          />
        </div>
        )}
      </div>

      <div>
        <button onClick={() => handleTabChange('expenses')}>Expenses</button>
        {selectedTab === 'expenses' && (
          <div>
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
          <ExpensesList expensesList= {getExpenses} handleExpenseDelete={handleExpenseDelete}/>
          </div>
        )}
      </div>

      <div>
        <button onClick={() => handleTabChange('goals')}>Goals</button>
        {selectedTab === 'goals' && (
          <div>
          <form onSubmit={handleGoalSubmit}>
            <input 
            type="text"
             placeholder="Name"
             name= 'name'
             value = {goal.name}
             onChange= {handleGoalChange}
              />
            <input
             type="number" 
             placeholder="Amount to Save" 
             name = 'amountToSave'
             value = {goal.amountToSave}
             onChange = {handleGoalChange}
             />
            <input 
            type="date" 
            placeholder="Deadline"
            name= 'byDate'
            value = {goal.byDate}
            onChange= {handleGoalChange}
             />

            <label>
              Short Term:
              <input
              name= 'shortTerm'
                type="checkbox"
                checked={goal.shortTerm}
                onChange={handleGoalCheckboxChange}
              />
            </label>
            <button type="submit">Submit</button>
          </form>
          <GoalList goalList= {getGoals} handleGoalDelete= {handleGoalDelete}/>
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;