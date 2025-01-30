const userService = require('../services/userService');

const register = async (req, res, next) => {
  try {
    const newUser = await userService.registerUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { user, token } = await userService.loginUser(req.body);
    res.json({ user, token });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
};