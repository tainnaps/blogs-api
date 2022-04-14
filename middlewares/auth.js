const jwt = require('jsonwebtoken');
const UserServices = require('../services/user');
const { createError } = require('../helpers');

const SECRET = process.env.JWT_SECRET;

const validateToken = async (req, _res, next) => {
  const { authorization: token } = req.headers;

  if (!token) {
    const error = createError('Token not found', 'unauthorized');
    return next(error);
  }

  try {
    const { payload: email } = jwt.verify(token, SECRET);

    const user = await UserServices.getByEmail(email);

    req.user = user;

    next();
  } catch (error) {
    error.message = 'Expired or invalid token';
    error.type = 'unauthorized';

    next(error);
  }
};

module.exports = {
  validateToken,
};
