const statusByErrorType = {
  conflict: 409,
  badRequest: 400,
};

const getStatusByError = (errorType) => statusByErrorType[errorType];

module.exports = getStatusByError;
