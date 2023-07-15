const AppError = require('../errors/AppError');
const { ERRORS, STATUS_CODES } = require('../utils/constants');

const sendNotFoundPageError = (req, res, next) => {
  try {
    throw AppError(ERRORS.NOT_FOUND_PAGE_ERROR.name, STATUS_CODES.NOT_FOUND_ERROR);
  } catch (err) {
    next(err);
  }
};

module.exports = sendNotFoundPageError;
