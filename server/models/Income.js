const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  passive: {
    type: Boolean,
    default: false
  },
  amount: {
    type: Number,
    required: true
  },
  recurringOrSalary: {
    type: Boolean,
    default: false
  }
});

// module.exports = mongoose.model('Income', incomeSchema);

const Income = mongoose.model('Income', incomeSchema);

module.exports = Income;