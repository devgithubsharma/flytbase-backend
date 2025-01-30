const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/Users'); 

const registerUser = async (userData) => {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(userData.password, 10); 
    userData.password = hashedPassword;

    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    throw error;
  }
};

const loginUser = async (userData) => {
  try {
    const user = await User.findOne({ email: userData.email });

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const passwordMatch = await bcrypt.compare(userData.password, user.password);

    if (!passwordMatch) {
      throw new Error('Invalid email or password');
    }

    const token = jwt.sign({ userId: user._id }, "f382e27b62ecba47b5507a57c37b06d995ed7d61c0a5d2cc8a33f515b38de248", { expiresIn: '5h' }); 
    return { user, token };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  registerUser,
  loginUser,
};