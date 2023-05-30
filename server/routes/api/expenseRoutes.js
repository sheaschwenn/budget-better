const router= require('express').Router()

const {
    createExpense,
    updateExpense,
    deleteExpense
} = require('../../controllers/expenseController')

route.route('/').post(createExpense).put(updateExpense).delete(deleteExpense)

module.exports = router