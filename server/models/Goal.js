const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true 
  },
  AmountToSave: { 
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

const Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;