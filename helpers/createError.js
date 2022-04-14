const createError = (message, type) => {
  const error = new Error(message);

  error.type = type;

  return error;
};

module.exports = createError;
