const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  expenses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Expense'
  }],
  income: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Income'
  }],
  settings: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Setting'
  },
  goal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Goal'
  }
});

module.exports = mongoose.model('User', userSchema);