const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); 

const connectDB = async () => {
  
  mongoose.connect("mongodb://127.0.0.1:27017/flytbase-backend")
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err))

}

module.exports = connectDB;