const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Passive: { type: Boolean, default: false },
  Amount: { type: Number, required: true },
  RecurringOrSalary: { type: Boolean, default: false }
});

const Income = mongoose.model('Income', incomeSchema);

module.exports = Income;