const{Goal, User} = require('../models')

module.exports = {
    createGoal(req, res){
        Goal.create(req.body)
        .then((goal) =>{
            const goalId = goal._id;
            return User.findOneAndUpdate(
                // need a way to find a single user tokens?
                {$addToSet: {Goal: {_id: goalId}}},
                {runValidators: true, new: true}
            ).then(()=> goal)
        })
        .then((goal) => res.json(goal))
        .catch((err) => {
            console.error(err)
            return res.status(500).json(err)
        })
        .catch((err) => res.status(500).json(err))
    },

    updateGoal(req, res){
        Goal.findOneAndUpdate(
            // need id here somehow
            {$set: req.body},
            {runValidators: true, new: true}
        )
        .then((goal) =>
            !goal? res.status(404).json({message: 'No goal matching that id'}): res.json(goal)
        ).catch((err) => res.status(500).json(err))
    },

    deleteGoal(req, res){
        Goal.findOneAndDelete(
        //   need id
        ).then((goal) =>
        !goal?res.status(404).json({message: 'No goal with this ID'}): res.json({message : "Goal has been deleted"}))
        .catch((err) => res.status(500).json(err))
    }
}