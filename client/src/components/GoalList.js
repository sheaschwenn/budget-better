import React from 'react'

const GoalList = ({goalList}) => {
    if(!goalList.length){
        return <h4>No recorded goals</h4>
    }

    return(
        <div>
            {goalList && goalList.map((single) =>(
                <div key= {single._id} >
                    <h4>{single.name} ${single.amountToSave} {single.byDate} {single.shortTerm}</h4>
                     </div>
            ))}
        </div>
    )
}

export default GoalList