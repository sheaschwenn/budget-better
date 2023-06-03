const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  amountToSave: {
    type: Number,
    required: true
  },
  byDate: {
    type: Date,
    required: true
  },
  shortTerm: {
    type: Boolean,
    default: false
  }
});

// module.exports = mongoose.model('Goal', goalSchema);

const Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;