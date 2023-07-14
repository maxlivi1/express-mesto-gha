const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST_ERROR: 400,
  BAD_LOGIN_ERROR: 401,
  NOT_FOUND_ERROR: 404,
  BAD_REGISTRATION_ERROR: 409,
  INTERNAL_SERVER_ERROR: 500,
};

const ERRORS = {
  BAD_USER_REQUEST_ERROR: {
    name: 'BadUserRequestError',
    message: 'Переданы некорректные данные при создании пользователя.',
  },
  BAD_USER_PROFILE_REQUEST_ERROR: {
    name: 'BadUserProfileRequestError',
    message: 'Переданы некорректные данные при обновлении профиля.',
  },
  BAD_USER_AVATAR_REQUEST_ERROR: {
    name: 'BadUserAvatarRequestError',
    message: 'Переданы некорректные данные при обновлении аватара.',
  },
  BAD_CARD_REQUEST_ERROR: {
    name: 'BadCardRequestError',
    message: 'Переданы некорректные данные при создании карточки.',
  },
  BAD_CARD_LIKE_REQUEST_ERROR: {
    name: 'BadCardLikeRequestError',
    message: 'Переданы некорректные данные для постановки/снятии лайка.',
  },
  NOT_FOUND_USER_ERROR: {
    name: 'NotFoundUserError',
    message: 'Пользователь по указанному id не найден.',
  },
  NOT_AUTH_USER_ERROR: {
    name: 'NotAuthUserError',
    message: 'Необходима авторизоваться.',
  },
  BAD_LOGIN_ERROR: {
    name: 'NotFoundLoginError',
    message: 'Неверно указан логин или пароль.',
  },
  NOT_FOUND_CARD_ERROR: {
    name: 'NotFoundCardError',
    message: 'Карточка с указанным id не найдена',
  },
  NOT_FOUND_PAGE_ERROR: {
    name: 'NotFoundPageError',
    message: 'Страница по запрашиваемому адресу не существует.',
  },
  BAD_REGISTRATION_ERROR: {
    name: 'BadRegistrationError',
    message: 'Пользователь с таким email уже зарегистрирован.',
  },
  INTERNAL_SERVER_ERROR: {
    name: 'InternalServerError',
    message: 'Что-то пошло не так. Ошибка на сервере.',
  },
};

module.exports = { STATUS_CODES, ERRORS };
