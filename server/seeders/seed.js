const db = require('../config/connection');
const { User, Expense, Income, Setting, Goal } = require('../models');
const userSeeds = require('./userSeeds.json');
const expenseSeeds = require('./expenseSeeds.json');
const incomeSeeds = require('./incomeSeeds.json');
const settingSeeds = require('./settingSeeds.json');
const goalSeeds = require('./goalSeeds.json');

db.once('open', async () => {
  try {
    // Delete existing data
    await User.deleteMany({});
    await Expense.deleteMany({});
    await Income.deleteMany({});
    await Setting.deleteMany({});
    await Goal.deleteMany({});

    // Create new data
    const users = await User.create(userSeeds);
    const expenses = await Expense.create(expenseSeeds);

    // Attach the first expense to the first user
    users[0].expenses.push(expenses[0]._id);
    await users[0].save();

    // Create other data...
    await Income.create(incomeSeeds);
    await Setting.create(settingSeeds);
    await Goal.create(goalSeeds);

    // If you have more relations that need to be updated, you can do that here

  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});