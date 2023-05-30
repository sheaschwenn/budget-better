const{Income, User} = require('../models')

module.exports = {
    createIncome(req, res){
        Income.create(req.body)
        .then((income) =>{
            const incomeId = income._id;
            return User.findOneAndUpdate(
                // need a way to find a single user tokens?
                {$addToSet: {Income: {_id: incomeId}}},
                {runValidators: true, new: true}
            ).then(()=> income)
        })
        .then((income) => res.json(income))
        .catch((err) => {
            console.error(err)
            return res.status(500).json(err)
        })
        .catch((err) => res.status(500).json(err))
    },

    updateIncome(req, res){
        Income.findOneAndUpdate(
            // need id here somehow
            {$set: req.body},
            {runValidators: true, new: true}
        )
        .then((income) =>
            !income? res.status(404).json({message: 'No income matching that id'}): res.json(income)
        ).catch((err) => res.status(500).json(err))
    },

    deleteIncome(req, res){
        Income.findOneAndDelete(
        //   need id
        ).then((income) =>
        !income?res.status(404).json({message: 'No source of income with this ID'}): res.json({message : "Source of income has been deleted"}))
        .catch((err) => res.status(500).json(err))
    }
}