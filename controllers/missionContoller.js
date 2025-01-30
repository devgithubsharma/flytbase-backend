const missionService = require('../services/missionService');

const createMission = async (req, res, next) => {
  try {
    const newMission = await missionService.createMission(req.body);
    res.status(201).json(newMission);
  } catch (error) {
    next(error);
  }
};

// const getMissions = async (req, res, next) => {
//   try {
//     const missions = await missionService.getMissions(req.user._id);
//     res.json(missions);
//   } catch (error) {
//     next(error);
//   }
// };

const getMission = async (req, res, next) => {
  try {
    const mission = await missionService.getMissionById(req.params.missionId);
    res.json(mission);
  } catch (error) {
    next(error);
  }
};

const updateMission = async (req, res, next) => {
  try {
    const updatedMission = await missionService.updateMission(req.params.missionId, req.body);
    res.json(updatedMission);
  } catch (error) {
    next(error);
  }
};

const deleteMission = async (req, res, next) => {
  try {
    const deletedMission = await missionService.deleteMission(req.params.missionId);
    res.json(deletedMission);
  } catch (error) {
    next(error);
  }
};

const startMission = async (req, res, next) => {
  try {
    
    const flightLog = await missionService.startMission(req.params.missionId, req.params.droneId); 
    res.status(200).json(flightLog); 
  } catch (error) {
    next(error);
  }
};

const stopMission = async (req, res, next) => {
    try {
      const flightLog = await missionService.stopMission(req.params.missionId);
      res.status(200).json({ message: 'Mission stopped', flightLog }); 
    } catch (error) {
      next(error);
    }
  };

module.exports = {
  createMission,
  // getMissions,
  getMission,
  updateMission,
  deleteMission,
  startMission,
  stopMission,
};