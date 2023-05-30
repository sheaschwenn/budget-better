const router = require('express').Router();

const apiRoutes = require('./api');
const dashboardRoutes = require('./dashboardRoute')
const landingRoutes = require('./landingRoutes')


router.use('/', landingRoutes)
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);

module.exports = router;