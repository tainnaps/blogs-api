const express = require('express');
const { validateUserExistence, validateUserData } = require('../middlewares/user');
const UserControllers = require('../controllers/user');

const router = express.Router();

router.post(
  '/',
  validateUserData,
  validateUserExistence,
  UserControllers.create,
);

module.exports = router;
