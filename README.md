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

   a- Calculates the distance between the current waypoint and the next waypoint.
   
   b- Calculates the estimated travel time based on the distance and speed.
   
   c- "Waits" for the travel time (simulated using setTimeout).
   
   d- Logs the "arrival" at the next waypoint (including the time, latitude, longitude, and altitude) in the flight log.
   
   e- Updates the total distance traveled in the flight log.

5- When all waypoints have been processed, the simulation is complete, and the flight log is updated with the end time.

##### Stopping the Simulation: 

The project also includes functionality to stop the simulation.  This is important if a mission needs to be aborted before it completes all waypoints.  When a mission is stopped, the simulation timer is cleared, and the flight log is updated with the end time.

## 🏗️ Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Environment Variables**: dotenv


#### Start Server:

The server will run at : http://localhost:8000

Terminal commands: 

1- node app.js

##### 2- API Endpoints: 

1- '/api/users/register'  => For user registration

2- '/api/users/login' => For user login

3- '/api/drones/create' => To create drones (authorization required)

4- '/api/drones/getDroneByUserId' => Fetch drones (authorization required)

5- '/api/drones/update' => Update drones (authorization required)

6- '/api/drones/delete' => Delete Drones (authorization required)

7- '/api/missions/create' => Create Mission (authorization required)

8- '/api/missions/getMission' => Fetch Mission (authorization required)

9- '/api/missions/delete' => Delete Mission (authorization required)

10- '/api/missions/:missionId/:droneId/startMission' => Start Mission (authorization required)

11- '/api/missions/:missionId/stopMission' => Stop Mission (authorization required)

12- '/api/:flightId/flightLogs' => To Fetch FLightLogs 



