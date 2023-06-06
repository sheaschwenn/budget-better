const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


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
  goal: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Goal',
    default: []
  }]
});

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;