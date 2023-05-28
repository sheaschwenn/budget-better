const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  Email: { type: String, required: true },
  Password: { type: String, required: true },
  Expenses: [expensesSchema],
  Income: [incomeSchema],
  Settings: settingSchema,
  Goal: goalSchema
});

const User = mongoose.model('User', userSchema);

module.exports = User;