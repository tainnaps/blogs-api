const { User } = require('../models');
const { createError } = require('../helpers');

const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });

  if (!user || password !== user.password) {
    const error = createError('Invalid fields', 'invalidFields');
    throw error;
  }
};

module.exports = {
  login,
};
