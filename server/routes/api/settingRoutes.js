const router= require('express').Router()
const{
    updateSetting
} = require('./../../controllers/settingController')

route.route('/').put(updateSetting)

module.exports = router