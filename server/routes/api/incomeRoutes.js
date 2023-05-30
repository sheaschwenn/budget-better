const router= require('express').Router();

const {
    createIncome,
    updateIncome,
    deleteIncome
} = require('../../controllers/incomeController')

route.route('/').post(createIncome).put(updateIncome).delete(deleteIncome)

module.exports = router