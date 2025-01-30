const mongoose = require('mongoose');
const FlightLog = require('../models/FlightLogs');

const getFlightLogByFlightId = async (flightId) => {
  try {
    console.log(flightId)
    const flightLog = await FlightLog.findById(flightId);
    return flightLog;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getFlightLogByFlightId,
};