import React from 'react'
import { DELETE_INCOME } from '../utils/mutations'
import { useMutation } from '@apollo/client'

const IncomeList = ({incomes, handleDelete}) => {
   
    if(!incomes.length){
        return <h4>No recorded income</h4>
    }

    return(
        <div>
            {incomes && incomes.map((single) =>(
                <div key= {single._id} >
                    <h4>{single.name} ${single.amount} {single.createdOn}
                    <button onClick={() => handleDelete(single._id)}>Delete</button>
                    </h4>
                     </div>
            ))}
        </div>
    )
}

export default IncomeList