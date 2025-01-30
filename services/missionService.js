const Mission = require('../models/Mission');
const FlightLog = require('../models/FlightLogs');
const turf = require('@turf/turf');

// ... import necessary libraries for geolocation calculations (e.g., turf.js)
const simulations = new Map();
const createMission = async (missionData) => {
  try {
    const newMission = await Mission.create(missionData);
    return newMission;
  } catch (error) {
    throw error;
  }
};


const getMissionById = async (missionId) => {
  try {
    const mission = await Mission.findById(missionId);
    if (!mission) {
      throw new Error('Mission not found');
    }
    return mission;
  } catch (error) {
    throw error;
  }
};

const updateMission = async (missionId, missionData) => {
  try {
    const updatedMission = await Mission.findByIdAndUpdate(missionId, missionData, { new: true });
    if (!updatedMission) {
      throw new Error('Mission not found');
    }
    return updatedMission;
  } catch (error) {
    throw error;
  }
};

const deleteMission = async (missionId) => {
  try {
    const deletedMission = await Mission.findByIdAndDelete(missionId);
    if (!deletedMission) {
      throw new Error('Mission not found');
    }
    return deletedMission;
  } catch (error) {
    throw error;
  }
};

const startMission = async (missionId, droneId) => {
  try {
    const mission = await Mission.findById(missionId);

    if (!mission) {
      throw new Error('Mission not found');
    }

    const waypoints = mission.waypoints;
    if (!waypoints || waypoints.length === 0) {
      throw new Error('Mission has no waypoints');
    }

    const initialWaypoint = waypoints[0];
    const flightLog = await FlightLog.create({
      mission_name: mission.name,
      mission_id: missionId,
      drone_id: droneId,
      waypoints: [{
        time: 0,
        lat: initialWaypoint.lat,
        lng: initialWaypoint.lng,
        alt: initialWaypoint.alt,
      }],
      speed: mission.speed,
      distance: 0,
      execution_start: new Date(),
    });

    let currentWaypointIndex = 1;
    let accumulatedDistance = 0;

    const simulateFlight = async () => {
      if (currentWaypointIndex >= waypoints.length) {
        console.log('Mission completed!');

        const completedFlightLog = await FlightLog.findOne({ _id: flightLog._id });
        if (completedFlightLog) {
          await FlightLog.findByIdAndUpdate(completedFlightLog._id, { execution_end: new Date() });
        }

        simulations.delete(missionId);
        return;
      }

      const currentWaypoint = waypoints[currentWaypointIndex - 1];
      const nextWaypoint = waypoints[currentWaypointIndex];

      const distance = turf.distance(
        turf.point([currentWaypoint.lng, currentWaypoint.lat]),
        turf.point([nextWaypoint.lng, nextWaypoint.lat]),{ units: 'meters' }
      );
      accumulatedDistance += distance;
      const travelTime = distance / mission.speed * 1000;

      await FlightLog.findByIdAndUpdate(
        flightLog._id,
        {
          $push: {
            waypoints: {
              time: new Date(),
              lat: nextWaypoint.lat,
              lng: nextWaypoint.lng,
              alt: nextWaypoint.alt,
            },
          },
          $inc: { distance: accumulatedDistance },
        },
        { new: true }
      );

      const timeoutId = setTimeout(simulateFlight, travelTime); // Get the timeout ID

      simulations.set(missionId, { 
          intervalId: timeoutId, // Store the ID directly
          flightLogId: flightLog._id, 
          simulateFlight 
      });

      currentWaypointIndex++;

    };

    simulateFlight();

    return flightLog;

  } catch (error) {
    throw error;
  }
};

const stopMission = async (missionId) => {
  try {
    const simulation = simulations.get(missionId);

    if (!simulation) {
      throw new Error('No simulation found for this mission.');
    }

    if (simulation.intervalId) {
      clearTimeout(simulation.intervalId);
    }

    simulations.delete(missionId);

    const flightLog = await FlightLog.findOne({ mission_id: missionId }).sort({ execution_start: -1 });

    if (!flightLog) {
      throw new Error('No flight log found for this mission.');
    }

    const updatedFlightLog = await FlightLog.findByIdAndUpdate(
      flightLog._id,
      { execution_end: new Date() },
      { new: true }
    );

    return updatedFlightLog;
  } catch (error) {
    throw error;
  }
};

module.exports = {
    createMission,
    // getMissions,
    getMissionById,
    updateMission,
    deleteMission,
    startMission,
    stopMission
  };