const { sendError } = require('../errors/sendError');
const throwError = require('../errors/throwError');
const { ERRORS } = require('../utils/constants');

const sendNotFoundPageError = (req, res) => {
  sendError(throwError(ERRORS.NOT_FOUND_PAGE_ERROR.name), res);
};

module.exports = sendNotFoundPageError;
