const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const connectDB = require('./db'); 
const userRoutes = require('./controllers/usersController');
const droneRoutes = require('./controllers/droneController');
const missionRoutes = require('./controllers/missionContoller');
const flightLogRoutes = require('./controllers/flightLogController'); 
const authMiddleware = require('./middleware/authmiddleware'); 
const PORT = 8000;

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/users/register', userRoutes.register);
app.use('/api/users/login', userRoutes.login);
app.use('/api/drones/create', authMiddleware, droneRoutes.createDrone);
app.use('/api/drones/getDroneByUserId', authMiddleware, droneRoutes.getDrones);
app.use('/api/drones/update', authMiddleware, droneRoutes.updateDrone);
app.use('/api/drones/delete', authMiddleware, droneRoutes.deleteDrone);
app.use('/api/missions/create', missionRoutes.createMission); 
app.use('/api/missions/getMission', authMiddleware, missionRoutes.getMission); 
app.use('/api/missions/delete', authMiddleware, missionRoutes.deleteMission);
app.use('/api/missions/:missionId/:droneId/startMission', authMiddleware, missionRoutes.startMission);  
app.use('/api/missions/:missionId/stopMission', authMiddleware, missionRoutes.stopMission); 
app.use('/api/:flightId/flightLogs', flightLogRoutes.getFlightLog); 

// Connect to MongoDB
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});