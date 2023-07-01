const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST_ERROR: 400,
  NOT_FOUND_ERROR: 404,
  INTERNAL_SERVER_ERROR: 500,
};

const ERRORS = {
  BAD_USER_REQUEST_ERROR: {
    name: 'BadUserRequestError',
    statusCode: STATUS_CODES.BAD_REQUEST_ERROR,
    message: 'Переданы некорректные данные при создании пользователя.',
  },
  BAD_USER_PROFILE_REQUEST_ERROR: {
    name: 'BadUserProfileRequestError',
    statusCode: STATUS_CODES.BAD_REQUEST_ERROR,
    message: 'Переданы некорректные данные при обновлении профиля.',
  },
  BAD_USER_AVATAR_REQUEST_ERROR: {
    name: 'BadUserAvatarRequestError',
    statusCode: STATUS_CODES.BAD_REQUEST_ERROR,
    message: 'Переданы некорректные данные при обновлении аватара.',
  },
  BAD_CARD_REQUEST_ERROR: {
    name: 'BadCardRequestError',
    statusCode: STATUS_CODES.BAD_REQUEST_ERROR,
    message: 'Переданы некорректные данные при создании карточки.',
  },
  BAD_CARD_LIKE_REQUEST_ERROR: {
    name: 'BadCardLikeRequestError',
    statusCode: STATUS_CODES.BAD_REQUEST_ERROR,
    message: 'Переданы некорректные данные для постановки/снятии лайка.',
  },
  NOT_FOUND_USER_ERROR: {
    name: 'NotFoundUserError',
    statusCode: STATUS_CODES.NOT_FOUND_ERROR,
    message: 'Пользователь по указанному id не найден.',
  },
  NOT_FOUND_CARD_ERROR: {
    name: 'NotFoundCardError',
    statusCode: STATUS_CODES.NOT_FOUND_ERROR,
    message: 'Карточка с указанным id не найдена',
  },
  INTERNAL_SERVER_ERROR: {
    name: 'InternalServerError',
    statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
    message: 'Что-то пошло не так. Ваш запрос не выполнен.',
  },
};

module.exports = { STATUS_CODES, ERRORS };