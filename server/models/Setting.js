const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
  light: { type: Boolean, default: false },
  currency: { type: String },
  language: { type: String }
});

const Setting = mongoose.model('Setting', settingSchema);

module.exports = Setting;