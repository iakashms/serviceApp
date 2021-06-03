const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  user_type: {
    type: String,
    required: true
  },
  created_at: {
    type: String,
    required: false
  },
  is_active: {
    type: Boolean,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('User', eventSchema);