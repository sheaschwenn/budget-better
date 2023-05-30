const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true, // Ensure email is unique
    lowercase: true, // Convert email to lowercase
    match: /^\S+@\S+\.\S+$/ // Validate email format using regex
  },
  password: {
    type: String,
    required: true,
    minlength: 6 // Minimum password length of 6 characters
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