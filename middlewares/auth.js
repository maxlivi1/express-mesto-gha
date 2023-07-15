const AppError = require('../errors/AppError');
const { isAuthorized, getPayload } = require('../helpers/jwt');
const { ERRORS, STATUS_CODES } = require('../utils/constants');

const auth = (req, res, next) => {
  const { jwt } = req.cookies;
  if (!jwt) {
    next(AppError(ERRORS.NOT_AUTH_USER_ERROR.name, STATUS_CODES.BAD_LOGIN_ERROR));
    return;
  }

  if (!isAuthorized(jwt)) {
    next(AppError(ERRORS.NOT_AUTH_USER_ERROR.name, STATUS_CODES.BAD_LOGIN_ERROR));
    return;
  }
  req.user = { _id: getPayload(jwt)._id };
  next();
};

module.exports = { auth };
