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
            {expensesList && expensesList.map((single) =>(
                <div key= {single._id} >
                    
                    <h4>{single.category} ${single.amount} {single.createdOn}
                    <button onClick={() => handleExpenseDelete(single._id) }>Delete</button>
                    <button onClick={() => handleClick(single._id, {expenseId: single._id, category: single.category, amount: single.amount, recurring: single.recurring}) }>Edit</button>
                    </h4>
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
        </div>
    )
}

export default ExpensesList