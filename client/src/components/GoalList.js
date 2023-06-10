import React from "react";

const GoalList = ({
  goalList,
  handleGoalDelete,
  handleGoalEdit,
  editGoal,
  setEditGoal,
  edit,
  setEdit,
}) => {
  const handleGoalEditChange = (event) => {
    const { name, value } = event.target;
    setEditGoal((prevEditGoal) => ({
      ...prevEditGoal,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (event) => {
    const { checked } = event.target;
    setEditGoal((prevState) => ({
      ...prevState,
      shortTerm: checked,
    }));
  };

  const handleClick = (goalId, initialGoal) => {
    setEditGoal(initialGoal);
    setEdit((prevEdit) => ({
      ...prevEdit,
      [goalId]: !prevEdit[goalId],
    }));
  };

  if (!goalList.length) {
    return <h4>No recorded goals</h4>;
  }

  return (
    <div>
      <ul role="list" className="divide-y divide-gray-100">
        {goalList &&
          goalList.map((single) => (
            <div key={single._id}>
              {/* <h4>{single.name} ${single.amountToSave} {single.byDate} {single.shortTerm} */}
              <li className="flex justify-between gap-x-6 py-5">
                <div className="flex gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {single.name}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      ${single.amountToSave}
                    </p>
                  </div>
                </div>
                <div className=" sm:flex sm:flex-col sm:items-end xs:flex xs:flex-col xs:items-end"> 
                <div className="flex gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="mt-1 text-xs leading-5 text-gray-500 text-right">
                    <time dateTime={single.byDate}>
                      By: {new Date(single.byDate).toISOString().split("T")[0]}
                    </time>
                  </p>

                  <button
                    className="bg-red-500 hover:bg-red-700 text-red font-bold py-2 px-4 rounded"
                    onClick={() => handleGoalDelete(single._id)}
                  >
                    Delete
                  </button>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                    onClick={() =>
                      handleClick(single._id, {
                        goalId: single._id,
                        name: single.name,
                        amountToSave: single.amountToSave,
                        byDate: single.byDate,
                        shortTerm: single.shortTerm,
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
                <form  onSubmit={(event) => handleGoalEdit(event, single._id)}>
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={editGoal.name}
                    onChange={handleGoalEditChange}
                  />
                  <input
                   className="ml-2"
                    type="number"
                    placeholder="Amount to Save"
                    name="amountToSave"
                    value={editGoal.amountToSave}
                    onChange={handleGoalEditChange}
                  />
                  <input
                   className="ml-2"
                    type="date"
                    placeholder="Deadline"
                    name="byDate"
                    value={editGoal.byDate}
                    onChange={handleGoalEditChange}
                  />

                  <label  className="ml-2" >
                    Short Term:
                    <input
                    className="ml-2"
                      name="shortTerm"
                      type="checkbox"
                      checked={editGoal.shortTerm}
                      onChange={handleCheckboxChange}
                    />
                  </label>
                  <button  className="ml-2 rounded-md bg-indigo-600 px-3 py-1 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" type="submit">Submit</button>
                  <button  className=" ml-2 rounded-md bg-indigo-600 px-3 py-1 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" >Cancel</button>
                </form>
              )}
            </div>
          ))}
      </ul>
    </div>
  );
};

export default GoalList;
