const { calculateDistance } = require('../utils/geolocationUtils'); 
const FlightLog = require('../models/FlightLog');

const simulateFlight = async (mission, droneId, flightLogId) => {
  try {
    const missionWaypoints = mission.waypoints;
    let currentWaypointIndex = 0; 

    const simulateStep = async () => {
      if (currentWaypointIndex >= missionWaypoints.length) {
        // Mission completed
        await FlightLog.findByIdAndUpdate(flightLogId, { execution_end: new Date() });
        return; 
      }

      const currentWaypoint = missionWaypoints[currentWaypointIndex];
      const nextWaypoint = missionWaypoints[currentWaypointIndex + 1];

      if (!nextWaypoint) {
        // Reached the last waypoint
        await FlightLog.findByIdAndUpdate(flightLogId, {
          $push: {
            waypoints: {
              time: new Date(), 
              lat: currentWaypoint.lat,
              lng: currentWaypoint.lng,
              alt: currentWaypoint.alt,
            },
          },
          execution_end: new Date(),
        });
        return; 
      }

      const distance = calculateDistance(currentWaypoint, nextWaypoint); 
      const travelTime = distance / mission.speed * 1000; // Calculate travel time in milliseconds

      // Simulate movement with a delay
      setTimeout(async () => {
        // Calculate intermediate position (linear interpolation)
        const progress = 1; // Assuming constant speed for simplicity
        const latitude = currentWaypoint.lat + (nextWaypoint.lat - currentWaypoint.lat) * progress;
        const longitude = currentWaypoint.lng + (nextWaypoint.lng - currentWaypoint.lng) * progress;

        await FlightLog.findByIdAndUpdate(flightLogId, {
          $push: {
            waypoints: {
              time: new Date(), 
              lat: latitude, 
              lng: longitude, 
              alt: currentWaypoint.alt, 
            },
          },
        });

        currentWaypointIndex++;
        simulateStep(); 
      }, travelTime); 
    };

    simulateStep(); 
  } catch (error) {
    console.error('Simulation error:', error);
    // Handle errors (e.g., log, send notifications)
  }
};

module.exports = {
  simulateFlight,
};