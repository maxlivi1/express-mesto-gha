const { sendError } = require('../errors/sendError');
const throwError = require('../errors/throwError');
const { isAuthorized, getPayload } = require('../helpers/jwt');
const { ERRORS } = require('../utils/constants');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  // console.log('authorization', authorization);
  if (!authorization || !authorization.startsWith('Bearer ')) {
    // console.log('Check authorization');
    sendError(throwError(ERRORS.NOT_AUTH_USER_ERROR.name), res);
    return;
  }
  const token = authorization.replace('Bearer ', '');
  if (!isAuthorized(token)) {
    sendError(throwError(ERRORS.NOT_AUTH_USER_ERROR.name), res);
    return;
  }
  // console.log('getPayload');
  req.user = { _id: getPayload(token).id };
  next();
};

module.exports = { auth };
