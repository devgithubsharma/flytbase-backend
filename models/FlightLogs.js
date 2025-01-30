const mongoose = require('mongoose');

const flightLogSchema = new mongoose.Schema({
  drone_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Drone',
    required: true,
  },
  mission_name: {
    type: mongoose.Schema.Types.String,
    ref: 'Mission',
    required: true,
  },
  mission_id: { // Add mission_id to FlightLog
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mission',
    required: true,
  },
  waypoints: [{
    time: {
      type: Number, 
      required: true,
    },
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
    alt: {
      type: Number,
      required: true,
    },
  }],
  speed: {
    type: Number,
  },
  distance: {
    type: Number,
  },
  execution_start: {
    type: Date,
    required: true,
  },
  execution_end: {
    type: Date,
  },
}, { timestamps: true });

module.exports = mongoose.model('FlightLog', flightLogSchema);