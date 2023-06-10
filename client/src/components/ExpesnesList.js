import React from 'react'

const ExpensesList = ({expensesList, handleExpenseDelete, handleExpenseEdit, editExpense, setEditExpense, edit, setEdit}) => {

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
        <div>
            <ul role="list" className="divide-y divide-gray-100">
            {expensesList && expensesList.map((single) =>(
                <div key= {single._id} >
                    <li className="flex justify-between gap-x-6 py-5">
                    <div className="flex gap-x-4">
                    <div className="min-w-0 flex-auto">
        <p className="text-sm font-semibold leading-6 text-gray-900">{single.category}</p>
        <p className="mt-1 truncate text-xs leading-5 text-gray-500"> -${single.amount}</p>
      </div>
      </div>
      <div className="hidden sm:flex sm:flex-col sm:items-end">
                    {/* <h4>{single.category} -${single.amount} {single.createdOn} */}
                    <p className="mt-1 text-xs leading-5 text-gray-500"><date datetime={single.createdOn}></date></p>
                    <button onClick={() => handleExpenseDelete(single._id) }>Delete</button>
                    <button onClick={() => handleClick(single._id, {expenseId: single._id, category: single.category, amount: single.amount, recurring: single.recurring}) }>Edit</button>
                    {/* </h4> */}

                    </div>
                    </li>
                    {edit[single._id] && (
                         <form onSubmit={(event) => handleExpenseEdit(event, single._id)}>
                         <input 
                         name= 'category'
                         type="text" 
                         placeholder="Category" 
                         value= {editExpense.category}
                         onChange={handleExpenseEditChange}
                         />
                         <input 
                         name= 'amount'
                         type="number" 
                         placeholder="Amount" 
                         value= {editExpense.amount}
                         onChange={handleExpenseEditChange }
                         />
                          <label>
                           Recurring:
                           <input
                           name= 'recurring'
                             type="checkbox"
                             checked={editExpense.recurring}
                             onChange={handleCheckboxChange}
                           />
                         </label>
                         <button type="submit">Submit</button>
                       </form>
                    )}
                 
                     </div>
            ))}
            </ul>
        </div>
    )
}

export default ExpensesList