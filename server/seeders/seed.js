const db = require('../config/connection');
const { User, Expense, Income, Goal, Setting } = require('../models');
const userSeeds = require('./userSeeds.json');

db.once('open', async () => {
  try {
    // Delete existing data
    await User.deleteMany({});
    await Expense.deleteMany({});
    await Income.deleteMany({});
    await Setting.deleteMany({});
    await Goal.deleteMany({});

    // Create new data
    for (let userSeed of userSeeds) {
      const { expenses, income, goals, settings, ...userDetails } = userSeed;

      // Create expense docs
      const expenseDocs = await Expense.create(expenses);
      const expenseIds = expenseDocs.map(doc => doc._id);

      // Create income docs
      const incomeDocs = await Income.create(income);
      const incomeIds = incomeDocs.map(doc => doc._id);

      // Convert byDate string to Date object and create goal docs
      for (let goal of goals) {
        goal.byDate = new Date(goal.byDate);
      }
      const goalDocs = await Goal.create(goals);
      const goalIds = goalDocs.map(doc => doc._id);

      // Create setting docs
      const settingDocs = await Setting.create(settings);
      const settingIds = settingDocs.map(doc => doc._id);

      // Create user with associated expenses, income, goal, and settings
      await User.create({
        ...userDetails,
        expenses: expenseIds,
        income: incomeIds,
        goals: goalIds,
        settings: settingIds
      });
    }

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});