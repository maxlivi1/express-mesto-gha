const throwError = (errorName) => {
  const error = new Error();
  error.name = errorName;
  return error;
};

module.exports = throwError;
