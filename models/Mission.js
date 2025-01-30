const mongoose = require('mongoose');

const missionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  altitude: {
    type: Number,
    required: true,
  },
  speed: {
    type: Number,
    required: true,
  },
  waypoints: [{
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
}, { timestamps: true });

module.exports = mongoose.model('Mission', missionSchema);