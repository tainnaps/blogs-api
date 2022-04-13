const jwt = require('jsonwebtoken');
const UserServices = require('../services/user');

const SECRET = process.env.JWT_SECRET;

const validateTokenExistence = (req, _res, next) => {
  const { authorization: token } = req.headers;

  if (!token) {
    const error = new Error('Token not found');
    error.type = 'unauthorized';

    return next(error);
  }

  next();
};

const validateToken = async (req, _res, next) => {
  try {
    const { authorization: token } = req.headers;

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
  validateTokenExistence,
  validateToken,
};
