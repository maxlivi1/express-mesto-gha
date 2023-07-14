const { sendError } = require('../errors/sendError');
const { STATUS_CODES } = require('../utils/constants');

const errorHandler = (err, req, res, next) => {
  console.log('Вход в errorHandler', err.code, err.statusCode, err.name);
  const { statusCode = 500 } = err;

  if (err.code === 11000) {
    res.status(STATUS_CODES.BAD_REGISTRATION_ERROR).send({ message: 'Пользователь с указанным email уже зарегистрирован.' });
    return;
  }
  if (err.code === STATUS_CODES.BAD_LOGIN_ERROR || STATUS_CODES.BAD_REGISTRATION_ERROR
    || STATUS_CODES.BAD_REQUEST_ERROR || STATUS_CODES.NOT_FOUND_ERROR
    || STATUS_CODES.INTERNAL_SERVER_ERROR) {
    sendError(err, res);
    return;
  }
  if (statusCode === 500) {
    res.status(statusCode).send({ message: 'На сервере произошла ошибка.' });
  }
  next();
};

module.exports = { errorHandler };
