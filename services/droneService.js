const Drone = require('../models/Drone');
const User = require('../models/Users')

const createDrone = async (droneData, userId) => {
  console.log(userId)
  try {
    const newDrone = await Drone.create({ ...droneData, created_by: userId });
    console.log(newDrone)
    // Update the user's drones array
    await User.findByIdAndUpdate(userId, { 
      $push: { drones: newDrone._id } 
    }, { new: true });

    return newDrone;
  } catch (error) {
    throw error;
  }
};

const getDronesByUserId = async (userId) => {
  try {
    const drones = await Drone.find({ created_by: userId });
    return drones;
  } catch (error) {
    throw error;
  }
};

const getDroneById = async (droneId) => {
  try {
    const drone = await Drone.findById(droneId);
    if (!drone) {
      throw new Error('Drone not found');
    }
    return drone;
  } catch (error) {
    throw error;
  }
};

const updateDrone = async (droneId, droneData) => {
  try {
    const updatedDrone = await Drone.findByIdAndUpdate(droneId, droneData, { new: true }); 
    if (!updatedDrone) {
      throw new Error('Drone not found');
    }
    return updatedDrone;
  } catch (error) {
    throw error;
  }
};

const deleteDrone = async (droneId) => {
  try {
    const deletedDrone = await Drone.findByIdAndDelete(droneId);
    if (!deletedDrone) {
      throw new Error('Drone not found');
    }
    return deletedDrone;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createDrone,
  getDronesByUserId,
  getDroneById,
  updateDrone,
  deleteDrone,
};