import React, { useState } from "react";

const IncomeList = ({
  getIncome,
  handleDelete,
  handleIncomeEdit,
  editIncome,
  setEditIncome,
  edit,
  setEdit,
}) => {
  // const [edit, setEdit] = useState({})

  const handleIncomeEditChange = (event) => {
    const { name, value } = event.target;
    setEditIncome((prevEditIncome) => ({
      ...prevEditIncome,
      [name]: value,
    }));
  };
  const handleCheckboxChange = (event) => {
    const { checked } = event.target;
    if (event.target.name === "passive") {
      setEditIncome((prevState) => ({
        ...prevState,
        passive: checked,
      }));
    } else if (event.target.name === "recurring") {
      setEditIncome((prevState) => ({
        ...prevState,
        recurring: checked,
      }));
    }
  };

  const handleClick = (incomeId, initialIncome) => {
    console.log("this is happening");
    setEditIncome(initialIncome);
    setEdit((prevEdit) => ({
      ...prevEdit,
      [incomeId]: !prevEdit[incomeId],
    }));
  };

  // const closeClick = () => {
  //   setEdit(false)
  // }

  if (!getIncome.length) {
    return <h4>No recorded income</h4>;
  }

  return (
    <div>
      <ul role="list" className="divide-y divide-gray-100">
      {getIncome &&
        getIncome.map((single) => (
          <div key={single._id}>
                     <li className="flex justify-between gap-x-6 py-5">
                    <div className="flex gap-x-4">
                    <div className="min-w-0 flex-auto">
        <p className="text-sm font-semibold leading-6 text-gray-900">{single.name}</p>
        <p className="mt-1 truncate text-xs leading-5 text-gray-500"> ${single.amount}</p>
      </div>
      </div>
      <div className=" sm:flex sm:flex-col sm:items-end xs:flex xs:flex-col xs:items-end"> 
      <div className="flex gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="mt-1 text-xs leading-5 text-gray-500 text-right">
                                    <time dateTime={single.createdOn}>
                                       {new Date(single.createdOn).toISOString().split("T")[0]}
                                       </time>
                                       </p>
              <button className= "bg-red-500 hover:bg-red-700 text-red font-bold py-1 px-4 rounded" onClick={() => handleDelete(single._id)}>Delete</button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                onClick={() =>
                  handleClick(single._id, {
                    incomeId: single._id,
                    name: single.name,
                    passive: single.passive,
                    amount: single.amount,
                    recurring: single.recurring,
                  })
                }
              >
                Edit
              </button>
              </div>
              </div>
              </div>
              </li>
           
            {edit[single._id] && (
              <form   onSubmit={(event) => handleIncomeEdit(event, single._id)}>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={editIncome.name}
                  onChange={handleIncomeEditChange}
                />
                <label  className="ml-2">
                  Passive:
                  <input
                  className="ml-2"
                    type="checkbox"
                    name="passive"
                    checked={editIncome.passive}
                    onChange={handleCheckboxChange}
                  />
                </label>
                <input
                 className="ml-2"
                  type="number"
                  placeholder="Amount"
                  name="amount"
                  value={editIncome.amount}
                  onChange={handleIncomeEditChange}
                />
                <label  className="ml-2">
                  Recurring:
                  <input
                  className="ml-2"
                    type="checkbox"
                    name="recurring"
                    checked={editIncome.recurring}
                    onChange={handleCheckboxChange}
                  />
                </label>
                <button id = "submit" className="  ml-2 rounded-md bg-indigo-600 px-3 py-0.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" type="submit">Submit</button>
                <button  className="ml-2 rounded-md bg-indigo-600 px-3 py-0.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 " >Cancel</button>
              </form>
            )}
          </div>
        ))}
        </ul>
    </div>
  );
};

export default IncomeList;
