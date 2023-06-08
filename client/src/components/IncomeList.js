import React, {useState} from 'react'


const IncomeList = ({getIncome, handleDelete, handleIncomeEdit, handleIncomeCheckboxChange, handleIncomeChange}) => {
    const [edit, setEdit] = useState({})

    const [editIncome, setEditIncome] = useState({
        name: '',
        passive: false,
        amount: '',
        recurring: false
      })

      const handleIncomeEditChange = (event) =>{
        const { name, value } = event.target
        setEditIncome((prevEditIncome) => ({
            ...prevEditIncome,
            [name]: value,
        }))
        
      }

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
                        onChange={handleIncomeEditChange} 
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
                        
                        value= {editIncome.amount}
                        onChange= {handleIncomeEditChange}
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