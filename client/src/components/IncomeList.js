import React, {useState} from 'react'


const IncomeList = ({getIncome, handleDelete, handleIncomeEdit}) => {
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
      const handleCheckboxChange = (event) => {
        const { checked } = event.target;
        if(event.target.name === 'passive'){
        setEditIncome((prevState) => ({
          ...prevState,
          passive: checked,
        })
        );}
        else if(event.target.name === 'recurring'){
          setEditIncome((prevState) => ({
            ...prevState,
            recurring: checked,
          }))
        }
      };

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
                      <button onClick={() =>handleClick(single._id, setEditIncome({  name: single.name,
        passive: single.passive,
        amount: single.amount,
        recurring: single.recurring})) }>Edit</button> 
                    </h4>
                    {edit[single._id] && (
                        <form onSubmit={handleIncomeEdit}>
                        <input 
                        type="text" 
                        placeholder="Name"
                        name= 'name'
                        value= {editIncome.name}
                        onChange={handleIncomeEditChange} 
                        />
                        <label>
                          Passive:
                          <input 
                          type="checkbox" 
                          name= 'passive'
                          checked= {editIncome.passive}
                          onChange= {handleCheckboxChange}
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
                          checked= {editIncome.recurring}
                          onChange= {handleCheckboxChange}
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