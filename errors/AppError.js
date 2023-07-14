const AppError = (errorName, errorCode) => {
  const error = new Error();
  error.name = errorName;
  error.code = errorCode;
  return error;
};

module.exports = AppError;
