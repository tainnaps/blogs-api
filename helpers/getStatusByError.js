const statusByErrorType = {
  conflict: 409,
  invalidFields: 400,
  unauthorized: 401,
  notFound: 404,
};

const getStatusByError = (errorType) => statusByErrorType[errorType];

module.exports = getStatusByError;
