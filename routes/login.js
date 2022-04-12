const express = require('express');
const { validateLoginData } = require('../middlewares/login');
const LoginControllers = require('../controllers/login');

const router = express.Router();

router.post(
  '/',
  validateLoginData,
  LoginControllers.login,
);

module.exports = router;
