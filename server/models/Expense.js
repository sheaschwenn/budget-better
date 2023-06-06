const mongoose = require('mongoose');

const expensesSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  recurring: {
    type: Boolean,
    default: false
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
});

// module.exports = mongoose.model('Expense', expensesSchema);

const Expense = mongoose.model('Expense', expensesSchema);

module.exports = Expense;