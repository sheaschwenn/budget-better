import React from 'react'

const GoalList = ({goalList, handleGoalDelete, handleGoalEdit, editGoal, setEditGoal, edit, setEdit}) => {
   
    const handleGoalEditChange = (event) => {
        const {name, value} = event.target
        setEditGoal((prevEditGoal) => ({
            ...prevEditGoal,
            [name]: value,
        }))
    }

    const handleCheckboxChange = (event) => {
        const {checked} = event.target
        setEditGoal((prevState) => ({
            ...prevState,
            shortTerm: checked,
          }));
    }

    const handleClick = (goalId, initialGoal) => {
        setEditGoal(initialGoal)
        setEdit((prevEdit) => ({
            ...prevEdit,
            [goalId]: !prevEdit[goalId]
        }))
    }
   
    if(!goalList.length){
        return <h4>No recorded goals</h4>
    }

    return(
        <div>
            {goalList && goalList.map((single) =>(
                <div key= {single._id} >
                    <h4>{single.name} ${single.amountToSave} {single.byDate} {single.shortTerm}
                    <button onClick={() => handleGoalDelete(single._id) }>Delete</button>
                    <button onClick={() =>handleClick(single._id, { goalId: single._id, name: single.name,
        amountToSave: single.amountToSave,
        byDate: single.byDate,
        shortTerm: single.shortTerm})  }>Edit</button> 
                    </h4>
                    {edit[single._id] && (
                        <form onSubmit={(event) => handleGoalEdit(event, single._id)}>
            <input 
            type="text"
             placeholder="Name"
             name= 'name'
             value = {editGoal.name}
             onChange= {handleGoalEditChange}
              />
            <input
             type="number" 
             placeholder="Amount to Save" 
             name = 'amountToSave'
             value = {editGoal.amountToSave}
             onChange = {handleGoalEditChange}
             />
            <input 
            type="date" 
            placeholder="Deadline"
            name= 'byDate'
            value = {editGoal.byDate}
            onChange= {handleGoalEditChange}
             />

            <label>
              Short Term:
              <input
              name= 'shortTerm'
                type="checkbox"
                checked={editGoal.shortTerm}
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

export default GoalList