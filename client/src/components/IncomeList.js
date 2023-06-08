import React, {useState} from 'react'


const IncomeList = ({getIncome, handleDelete, handleIncomeEdit, handleIncomeCheckboxChange, handleChange}) => {
    const [edit, setEdit] = useState({})
    const handleClick = (incomeId) => {
        console.log("this is happening")
        setEdit((prevEdit) => ({
            ...prevEdit,
            [incomeId]: !prevEdit[incomeId],
          }));
    }

    const handleEditSubmit = (incomeId) =>{
        setEdit((prevEdit) => ({
            ...prevEdit,
            [incomeId]: false,
          }));
    }
    if(!getIncome.length){
        return <h4>No recorded income</h4>
    }

    return(
        <div>
            {getIncome && getIncome.map((single) =>(
                <div key= {single._id} >
                    <h4>{single.name} ${single.amount} {single.createdOn}
                    <button onClick={() => handleDelete(single._id) }>Delete</button>
                      <button onClick={() =>handleClick(single._id) }>Edit</button> 
                    </h4>
                    {edit[single._id] && (
                        <form onSubmit={handleIncomeEdit}>
                        <input 
                        type="text" 
                        placeholder="Name"
                        name= 'name'
                        value= {single.name}
                        // onChange={handleIncomeChange} 
                        />
                        <label>
                          Passive:
                          <input 
                          type="checkbox" 
                          name= 'passive'
                          checked= {single.passive}
                          onChange= {handleIncomeCheckboxChange}
                          />
                        </label>
                        <input 
                        type="number" 
                        placeholder="Amount" 
                        name= 'amount'
                        value= {single.amount}
                        onChange= {handleChange}
                        />
                        <label>
                          Recurring:
                          <input 
                          type="checkbox" 
                          name= 'recurring'
                          checked= {single.recurring}
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
                        <button type="submit"  onClick= {() => handleEditSubmit(single._id) }>Submit</button>
                      </form>
                    )}
                     </div>
            ))}
        </div>
    )
}

export default IncomeList