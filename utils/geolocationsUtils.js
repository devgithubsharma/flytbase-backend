const turf = require('@turf/turf'); 

const calculateDistance = (startPoint, endPoint) => {
  const from = turf.point([startPoint.lng, startPoint.lat]);
  const to = turf.point([endPoint.lng, endPoint.lat]);

  // Calculate distance in meters
  const distanceInMeters = turf.distance(from, to); 

  return distanceInMeters; 
};

module.exports = {
  calculateDistance,
};