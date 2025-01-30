const mongoose = require('mongoose');

const droneSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  drone_type: {
    type: String,
    enum: ['Real Drone', 'Simulation Drone'], 
    default: 'Simulation Drone',
  },
  make_name: {
    type: String,
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  deleted_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  deleted_on: {
    type: Date,
  },
}, { timestamps: true });

module.exports = mongoose.model('Drone', droneSchema);