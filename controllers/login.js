require('dotenv').config();
const jwt = require('jsonwebtoken');
const LoginServices = require('../services/login');

const SECRET = process.env.JWT_SECRET;

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    await LoginServices.login(email, password);

    const token = jwt.sign({ payload: email }, SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
};
