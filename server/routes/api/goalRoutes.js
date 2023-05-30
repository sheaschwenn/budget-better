const router= require('express').Router()
const {
    createGoal,
    updateGoal,
    deleteGoal
} = require('../../controllers/goalController')

route.route('/').post(createGoal).put(updateGoal).delete(deleteGoal)

module.exports = router