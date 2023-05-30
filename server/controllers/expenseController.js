const{Expense, User} = require('../models')

module.exports = {
    createExpense(req, res){
        Expense.create(req.body)
        .then((expense) =>{
            const expenseId = expense._id;
            return User.findOneAndUpdate(
                // need a way to find a single user tokens?
                {$addToSet: {Expenses: {_id: expenseId}}}
                {runValidators: true, new: true}
            ).then(()=> expense)
        })
        .then((thought) => res.json(thought))
        .catch((err) => {
            console.error(err)
            return res.status(500).json(err)
        })
        .catch((err) => res.status(500).json(err))
    },

    updateExpense(req, res){
        Expense.findOneAndUpdate(
            // need id here somehow
            {$set: req.body},
            {runValidators: true, new: true}
        )
        .then((expense) =>
            !thought? res.status(404).json({message: 'No expense matching that id'}): res.json(expense)
        ).catch((err) => res.status(500).json(err))
    },

    deleteExpense(req, res){
        Expense.findOneAndDelete(
        //   need id
        ).then((expense) =>
        !expense?res.status(404).json({message: 'No expense with this ID'}): res.json({message : "Expense has been deleted"}))
        .catch((err) => res.status(500).json(err))
    }
}