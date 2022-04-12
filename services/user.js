const { User } = require('../models');

const create = async (displayName, email, password, image) => {
  const existingUser = await User.findOne({ where: { email } });

  if (existingUser) {
    const error = new Error('User already registered');
    error.type = 'conflict';

    throw error;
  }

  await User.create({ displayName, email, password, image });
};

module.exports = {
  create,
};
