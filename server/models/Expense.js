const mongoose = require('mongoose');

const expensesSchema = new mongoose.Schema({
  Category: {
    type: String,
    required: true 
    },
  Amount: {
    type: Number,
    required: true 
  },
  Recurring: {
    type: Boolean,
    default: false 
  }
});

const Expense = mongoose.model('Expenses', expensesSchema);

module.exports = Expense;