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
  recurring: {
    type: Boolean,
    default: false
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
});

// module.exports = mongoose.model('Income', incomeSchema);

const Income = mongoose.model('Income', incomeSchema);

module.exports = Income;