const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  Email: { type: String, required: true },
  Password: { type: String, required: true },
  Expenses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Expense' }],
  Income: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Income' }],
  Settings: { type: mongoose.Schema.Types.ObjectId, ref: 'Setting' },
  Goal: { type: mongoose.Schema.Types.ObjectId, ref: 'Goal' }
});

const User = mongoose.model('User', userSchema);

module.exports = User;