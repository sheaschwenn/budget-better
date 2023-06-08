import React from 'react'

const ExpensesList = ({expensesList, handleExpenseDelete}) => {
    if(!expensesList.length){
        return <h4>No recorded income</h4>
    }

    return(
        <div>
            {expensesList && expensesList.map((single) =>(
                <div key= {single._id} >
                    
                    <h4>{single.category} ${single.amount} {single.createdOn}
                    <button onClick={() => handleExpenseDelete(single._id) }>Delete</button>
                    </h4>
                     </div>
            ))}
        </div>
    )
}

export default ExpensesList