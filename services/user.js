const { User } = require('../models');

const getByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });

  if (user) {
    const error = new Error('User already registered');

    error.type = 'conflict';

    throw error;
  }

  return user;
};

const create = async (displayName, email, password, image) => {
  await User.create({ displayName, email, password, image });
};

module.exports = {
  getByEmail,
  create,
};
