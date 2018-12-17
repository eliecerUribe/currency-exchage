const mongoose = require('mongoose');

const { Schema } = mongoose;

const currencySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  change: {
    type: Number,
    required: true,
  },
});

const Currency = mongoose.model('Currency', currencySchema);
module.exports = Currency;
