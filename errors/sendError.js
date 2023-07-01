const { ERRORS } = require('../utils/constants');

const sendError = (err, res) => {
  const keys = Object.keys(ERRORS);
  let isError = false;
  keys.forEach((errKey) => {
    if (ERRORS[errKey].name === err.name) {
      res.status(ERRORS[errKey].statusCode).send({ message: ERRORS[errKey].message });
      isError = true;
    }
  });
  if (!isError) {
    res
      .status(ERRORS.INTERNAL_SERVER_ERROR.statusCode)
      .send({ message: ERRORS.INTERNAL_SERVER_ERROR.message });
  }
};

module.exports = {
  sendError,
};
