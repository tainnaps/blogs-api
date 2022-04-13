const express = require('express');
const { validateUserData } = require('../middlewares/user');
const { validateTokenExistence, validateToken } = require('../middlewares/auth');
const UserControllers = require('../controllers/user');

const router = express.Router();

router.get(
  '/',
  validateTokenExistence,
  validateToken,
  UserControllers.getAll,
);

router.post(
  '/',
  validateUserData,
  UserControllers.create,
);

module.exports = router;
