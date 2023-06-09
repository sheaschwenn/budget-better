import React, {useState} from 'react'


const IncomeList = ({getIncome, handleDelete, handleIncomeEdit, editIncome, setEditIncome, edit, setEdit}) => {
    // const [edit, setEdit] = useState({})


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

    const handleClick = (incomeId, initialIncome) => {
        console.log("this is happening")
        setEditIncome(initialIncome)
        setEdit((prevEdit) => ({
            ...prevEdit,
            [incomeId]: !prevEdit[incomeId],
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
                      <button onClick={() =>handleClick(single._id, { incomeId: single._id, name: single.name,
        passive: single.passive,
        amount: single.amount,
        recurring: single.recurring})  }>Edit</button> 
                    </h4>
                    {edit[single._id] && (
                         <form onSubmit={(event) => handleIncomeEdit(event, single._id)}>
                        
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
                        
                        {/* <button type="submit"  onClick= {() => handleIncomeEdit(single._id) }>Submit</button> */}
                        <button 
                        
                        type="submit" >Submit</button>
                      </form>
                    )}
                     </div>
            ))}
        </div>
    )
}

export default IncomeList