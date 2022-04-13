const { User } = require('../models');

const getAll = async () => {
  const users = await User.findAll();

  return users;
};

const getByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });

  return user;
};

const create = async (displayName, email, password, image) => {
  const existingUser = await getByEmail(email);

  if (existingUser) {
    const error = new Error('User already registered');
    error.type = 'conflict';

    throw error;
  }

  await User.create({ displayName, email, password, image });
};

module.exports = {
  getAll,
  getByEmail,
  create,
};
