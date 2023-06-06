import React from 'react'

const IncomeList = ({incomes}) => {
    if(!incomes.length){
        return <h4>No recorded income</h4>
    }

    return(
        <div>
            {incomes && incomes.map((single) =>(
                <div key= {single._id} >
                    <h4>{single.name} ${single.amount} {single.createdOn}</h4>
                     </div>
            ))}
        </div>
    )
}

export default IncomeList