const { userSchema } = require('../schemas/user');

const validateUserData = async (req, _res, next) => {
  const { displayName, email, password, image } = req.body;

  const { error } = userSchema
    .validate({ displayName, email, password, image });

  if (error) return next(error);

  next();
};

module.exports = {
  validateUserData,
};
