const droneService = require('../services/droneService');

const createDrone = async (req, res, next) => {
  
  try {
    const newDrone = await droneService.createDrone(req.body, req.user.userId);
    res.status(201).json(newDrone);
  } catch (error) {
    next(error);
  }
};

const getDrones = async (req, res, next) => {
  try {
    const drones = await droneService.getDronesByUserId(req.user._id);
    res.json(drones);
  } catch (error) {
    next(error);
  }
};

const getDrone = async (req, res, next) => {
  try {
    const drone = await droneService.getDroneById(req.params.droneId);
    res.json(drone);
  } catch (error) {
    next(error);
  }
};

const updateDrone = async (req, res, next) => {
  try {
    const updatedDrone = await droneService.updateDrone(req.params.droneId, req.body);
    res.json(updatedDrone);
  } catch (error) {
    next(error);
  }
};

const deleteDrone = async (req, res, next) => {
  try {
    const deletedDrone = await droneService.deleteDrone(req.params.droneId);
    res.json(deletedDrone);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createDrone,
  getDrones,
  getDrone,
  updateDrone,
  deleteDrone,
};