const jwt = require('jsonwebtoken');
const rescue = require('express-rescue');
const userService = require('../services/userService');
const {
  STATUS_CODE_OK,
  STATUS_CODE_CREATED,
} = require('../helpers/index.js');

const JWT_SECRET = 'hardcoded-secret';
const jwtConfig = {
expiresIn: '7d',
algorithm: 'HS256',
};

const createUser = rescue(async (req, res) => {
  const { displayName, email, password, image } = req.body;
  
  const duplicateEmail = await userService.getUserByEmail(email);
  if (duplicateEmail) {
    return res.status(409).json({
      message: 'User already registered',
    });
  }
  
  const token = jwt.sign({ email }, JWT_SECRET, jwtConfig);

  await userService.createUser({ displayName, email, password, image });
  return res.status(STATUS_CODE_CREATED).json({ token });
});

const getById = rescue(async (req, res) => {
  const user = await userService.getById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'User does not exist' });
  }
    res.status(STATUS_CODE_OK).json(user);
});

const getAllUsers = rescue(async (req, res) => {
  const allUsers = await userService.getAllUsers();
    res.status(STATUS_CODE_OK).json(allUsers);
});

module.exports = {
  createUser,
  // getUserByEmail,
  getById,
  getAllUsers,
};