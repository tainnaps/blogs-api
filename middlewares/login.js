const { loginSchema } = require('../schemas/login');

const validateLoginData = async (req, _res, next) => {
  const { email, password } = req.body;

  const { error } = loginSchema.validate({ email, password });

  if (error) return next(error);

  next();
};

module.exports = {
  validateLoginData,
};
