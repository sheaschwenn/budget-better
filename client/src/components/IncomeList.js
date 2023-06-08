import React from 'react'
import { DELETE_INCOME } from '../utils/mutations'
import { useMutation } from '@apollo/client'

const IncomeList = ({getIncome, handleDelete, handleIncomeEdit, handleIncomeCheckboxChange, handleChange}) => {
   
    if(!getIncome.length){
        return <h4>No recorded income</h4>
    }

    return(
        <div>
            {getIncome && getIncome.map((single) =>(
                <div key= {single._id} >
                    <h4>{single.name} ${single.amount} {single.createdOn}
                    <button onClick={() => handleDelete(single._id) }>Delete</button>
                      <button onClick={() => handleIncomeEdit(single._id) }>Edit</button>
                    </h4>
                     </div>
            ))}
        </div>
    )
}

export default IncomeList