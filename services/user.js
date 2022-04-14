const { User } = require('../models');
const { createError } = require('../helpers');

const getAll = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });

  return users;
};

const getByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });

  return user;
};

const getById = async (id) => {
  const user = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } });

  if (!user) {
    const error = createError('User does not exist', 'notFound');
    throw error;
  }

  return user;
};

const create = async (displayName, email, password, image) => {
  const existingUser = await getByEmail(email);

  if (existingUser) {
    const error = createError('User already registered', 'conflict');
    throw error;
  }

  await User.create({ displayName, email, password, image });
};

const deleteById = async (id) => {
  await User.destroy({ where: { id } });
};

module.exports = {
  getAll,
  getByEmail,
  getById,
  create,
  deleteById,
};
