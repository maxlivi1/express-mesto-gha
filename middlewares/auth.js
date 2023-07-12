const throwError = require('../errors/throwError');
const { isAuthorized, getPayload } = require('../helpers/jwt');
const { ERRORS } = require('../utils/constants');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  console.log('authorization', authorization);
  if (!authorization || !authorization.startsWith('Bearer ')) {
    console.log('Check authorization');
    next(throwError(ERRORS.BAD_LOGIN_ERROR.name));
  }
  const token = authorization.replace('Bearer ', '');
  if (!isAuthorized(token)) next(throwError(ERRORS.NOT_AUTH_USER_ERROR.name));
  console.log('getPayload');
  req.user = { _id: getPayload(token).id };
  next();
};

module.exports = { auth };
