const AppError = require('../errors/AppError');
const { isAuthorized, getPayload } = require('../helpers/jwt');
const { ERRORS, STATUS_CODES } = require('../utils/constants');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(AppError(ERRORS.NOT_AUTH_USER_ERROR.name, STATUS_CODES.BAD_LOGIN_ERROR));
    return;
  }
  const token = authorization.replace('Bearer ', '');
  if (!isAuthorized(token)) {
    next(AppError(ERRORS.NOT_AUTH_USER_ERROR.name, STATUS_CODES.BAD_LOGIN_ERROR));
    return;
  }
  req.user = { _id: getPayload(token).id };
  next();
};

module.exports = { auth };
