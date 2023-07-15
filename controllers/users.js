const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const AppError = require('../errors/AppError');
const { ERRORS, STATUS_CODES } = require('../utils/constants');
const { getJwtToken } = require('../helpers/jwt');

const registration = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(STATUS_CODES.CREATED).send({ _id: user._id }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        // console.log(err.message);
        throw AppError(ERRORS.BAD_USER_REQUEST_ERROR.name, STATUS_CODES.BAD_REQUEST_ERROR);
      }
      next(err);
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(AppError(ERRORS.BAD_LOGIN_ERROR.name, STATUS_CODES.BAD_LOGIN_ERROR));
    return;
  }
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) throw AppError(ERRORS.BAD_LOGIN_ERROR.name, STATUS_CODES.BAD_LOGIN_ERROR);

      bcrypt.compare(password, user.password, (err, isValid) => {
        try {
          if (!isValid || err) {
            throw AppError(ERRORS.BAD_LOGIN_ERROR.name, STATUS_CODES.BAD_LOGIN_ERROR);
          }
          const token = getJwtToken(user._id);
          res
            .cookie('jwt', token, {
              maxAge: 3600000 * 24 * 7,
              httpOnly: true,
            })
            .send({ message: 'Вы авторизованы' });
        } catch (error) {
          next(error);
        }
      });
    })
    .catch(next);
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(AppError(ERRORS.NOT_FOUND_USER_ERROR.name, STATUS_CODES.NOT_FOUND_ERROR))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        throw AppError(ERRORS.BAD_USER_REQUEST_ERROR.name, STATUS_CODES.BAD_REQUEST_ERROR);
      }
      next(err);
    })
    .catch(next);
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const updateUserProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(AppError(ERRORS.NOT_FOUND_USER_ERROR.name, STATUS_CODES.NOT_FOUND_ERROR))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError
        || err instanceof mongoose.Error.ValidationError) {
        throw AppError(ERRORS.BAD_USER_PROFILE_REQUEST_ERROR.name, STATUS_CODES.BAD_REQUEST_ERROR);
      }
      next(err);
    })
    .catch(next);
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(AppError(ERRORS.NOT_FOUND_USER_ERROR.name, STATUS_CODES.NOT_FOUND_ERROR))
    .then((user) => res.send({ avatar: user.avatar }))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError
        || err instanceof mongoose.Error.ValidationError) {
        // console.log(err.message);
        throw AppError(ERRORS.BAD_USER_AVATAR_REQUEST_ERROR.name, STATUS_CODES.BAD_REQUEST_ERROR);
      }
      next(err);
    })
    .catch(next);
};

module.exports = {
  registration,
  getUserInfo,
  getUsers,
  updateUserProfile,
  updateUserAvatar,
  login,
};
