# flytbase-backend

### Project Overview:

*This project simulates a drone's flight along a predefined path (a series of waypoints) and logs the flight's progress.  The drone's flight path is defined by a "mission," which contains an array of waypoints. Each waypoint has a latitude, longitude, and altitude. The simulation calculates the distance between waypoints, estimates the travel time based on the drone's speed, and logs the drone's "arrival" at each waypoint.*

#### Key Components:

##### Missions: A "mission" represents the flight plan. It includes:

1- A name for the mission.
2- An array of waypoints.
3- The drone's speed.

##### Waypoints: A "waypoint" is a point in space that the drone is supposed to fly to. It includes:

1- Latitude.
2- Longitude.
3- Altitude.

##### Flight Logs: A "flight log" records the actual (or, in this case, simulated) flight. It includes:

1- The mission name.
2- The mission ID (a reference to the specific mission).
3- The drone ID (a reference to the drone that performed the flight).
4- An array of waypoint logs, where each entry represents the drone's "arrival" at a waypoint.
5- The drone's speed.
6- The total distance traveled.
7- The start and end times of the flight.

##### Simulation: The "simulation" is the core logic. It does the following:

1- Takes a mission ID and drone ID as input.
2- Retrieves the mission details (including waypoints and speed).
3- Creates a new flight log, initializing it with the first waypoint.
4- Iterates through the remaining waypoints:
5- Calculates the distance between the current waypoint and the next waypoint.
6- Calculates the estimated travel time based on the distance and speed.
