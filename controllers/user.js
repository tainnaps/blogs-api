require('dotenv').config();
const jwt = require('jsonwebtoken');
const UserServices = require('../services/user');

const SECRET = process.env.JWT_SECRET;

const create = async (req, res, next) => {
  try {
    const { displayName, email, password, image } = req.body;

    await UserServices.create(displayName, email, password, image);

    const token = jwt.sign({ payload: email }, SECRET, { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
};
