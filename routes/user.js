const express = require('express');
const { validateUserData } = require('../middlewares/user');
const UserControllers = require('../controllers/user');

const router = express.Router();

router.post(
  '/',
  validateUserData,
  UserControllers.create,
);

module.exports = router;
