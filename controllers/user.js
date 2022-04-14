require('dotenv').config();
const jwt = require('jsonwebtoken');
const UserServices = require('../services/user');

const SECRET = process.env.JWT_SECRET;

const getAll = async (_req, res, next) => {
  try {
    const users = await UserServices.getAll();

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await UserServices.getById(id);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

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

const deleteById = async (req, res, next) => {
  try {
    const { id } = req.user;

    await UserServices.deleteById(id);

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  deleteById,
};
