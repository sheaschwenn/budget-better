const router = require('express').Router();
const expenseRoutes = require('./expenseRoutes');
const incomeRoutes = require('./incomeRoutes');
const settingRoutes = require('./settingRoutes');
const goalRoutes = require('./goalRoutes');

router.use('/expenses', expenseRoutes);
router.use('/income', incomeRoutes);
router.use('/settings', settingRoutes);
router.use('/goals', goalRoutes);

module.exports = router;