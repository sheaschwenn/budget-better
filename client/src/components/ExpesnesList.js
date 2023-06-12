import React from 'react'
import { useContext } from 'react'
import { ThemeContext } from '../utils/ThemeContext'

const ExpensesList = ({expensesList, handleExpenseDelete, handleExpenseEdit, editExpense, setEditExpense, edit, setEdit}) => {
    const { isDarkMode } = useContext(ThemeContext);
    const styles = {
      backgroundColor: isDarkMode ? "#192734" : "#ffffff",
      color: isDarkMode ? "#ffffff" : "#121212",
    };
    const handleExpenseEditChange = (event) => {
        const {name, value} = event.target
        setEditExpense((prevEditExpense) => ({
            ...prevEditExpense,
            [name]: value,
        }))
    }

    const handleCheckboxChange = (event) => {
        const {checked} = event.target
        setEditExpense((prevState) => ({
            ...prevState,
            recurring: checked,
          }));
    }

    const handleClick = (expenseId, initialExpense) => {
        setEditExpense(initialExpense)
        setEdit((prevEdit) => ({
            ...prevEdit,
            [expenseId]: !prevEdit[expenseId]
        }))
    }
    if(!expensesList.length){
        return <h4>No recorded income</h4>
    }


    return(
        <div >
            <ul role="list" className="divide-y divide-gray-100">
            {expensesList && expensesList.map((single) =>(
                <div key= {single._id} >
                    <li className="flex justify-between gap-x-6 py-5">
                    <div className="flex gap-x-4">
                    <div className="min-w-0 flex-auto">
        <p style={styles}className="text-sm font-semibold leading-6 text-gray-900">{single.category}</p>
        <p style={styles}className="mt-1 truncate text-xs leading-5 text-gray-500"> -${single.amount}</p>
      </div>
      </div>
      <div style={styles}className=" sm:flex sm:flex-col sm:items-end xs:flex xs:flex-col xs:items-end"> 
      <div style={styles}className="flex gap-x-4">
                <div style={styles}className="min-w-0 flex-auto">
                  <p style={styles}className="mt-1 text-xs leading-5 text-gray-500 text-right">
                                    <time dateTime={single.createdOn}>
                                       {new Date(single.createdOn).toISOString().split("T")[0]}
                                       </time>
                                       </p>
                    <button className= "bg-red-500 hover:bg-red-700 text-red font-bold py-1 px-4 rounded"  onClick={() => handleExpenseDelete(single._id) }>Delete</button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded" onClick={() => handleClick(single._id, {expenseId: single._id, category: single.category, amount: single.amount, recurring: single.recurring}) }>Edit</button>
                    {/* </h4> */}

                    </div>
                    </div>
                    </div>
                    </li>
                    {edit[single._id] && (
                         <form onSubmit={(event) => handleExpenseEdit(event, single._id)}>
                         <input 
                         style={styles}
                         name= 'category'
                         type="text" 
                         placeholder="Category" 
                         value= {editExpense.category}
                         onChange={handleExpenseEditChange}
                         />
                         <input 
                         style={styles}
                          className="ml-2"
                         name= 'amount'
                         type="number" 
                         placeholder="Amount" 
                         value= {editExpense.amount}
                         onChange={handleExpenseEditChange }
                         />
                          <label  className="ml-2">
                           Recurring:
                           <input
                           style={styles}
                           className="ml-2"
                           name= 'recurring'
                             type="checkbox"
                             checked={editExpense.recurring}
                             onChange={handleCheckboxChange}

                           />
                         </label>
                         <button  className="ml-2 rounded-md bg-indigo-600 px-3 py-1 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" type="submit">Submit</button>
                         <button  className=" ml-2 rounded-md bg-indigo-600 px-3 py-1 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" >Cancel</button>
                       </form>
                    )}
                 
                     </div>
            ))}
            </ul>
        </div>
    )
}

export default ExpensesList