const flightLogService = require('../services/flightLogService');

const getFlightLog = async (req, res, next) => {
  try {
    const flightLog = await flightLogService.getFlightLogByFlightId(req.params.flightId);
    res.json(flightLog);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getFlightLog,
};