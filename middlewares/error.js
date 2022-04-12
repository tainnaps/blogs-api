const { getStatusByError } = require('../helpers');

const errorMiddleware = (error, _req, res, _next) => {
  if (error.isJoi) return res.status(400).json({ message: error.details[0].message });

  if (error.type) {
    const status = getStatusByError(error.type);

    return res.status(status).json({ message: error.message });
  }

  console.log(error.message);

  res.status(500).json({ message: 'Internal server error' });
};

module.exports = errorMiddleware;
