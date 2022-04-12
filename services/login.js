const { User } = require('../models');

const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });

  if (!user || password !== user.password) {
    const error = new Error('Invalid fields');
    error.type = 'invalidFields';

    throw error;
  }
};

module.exports = {
  login,
};
