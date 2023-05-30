const router= require('express').Router();
const {
    getUser
} = require("../controllers/dashboardController")

route.route('/').get(getUser)

module.exports = router