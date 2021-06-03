const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const serviceSchema = new Schema({
  service_name: {
    type: String,
    required: true
  },
  service_type: {
    type: String,
    required: true
  },
  service_charge: {
    type: Number,
    required: true
  },
  created_at: {
    type: String,
    required: false
  },
  created_by: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  is_active: {
    type: Boolean,
    required: true
  },
  is_chargeable: {
    type: Boolean,
    required: true
  },
  is_enabled: {
    type: Boolean,
    required: true
  },
  website: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
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
  },
  service_description: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Service', serviceSchema);