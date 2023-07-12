const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { sendError } = require('../errors/sendError');
const User = require('../models/user');
const throwError = require('../errors/throwError');
const { ERRORS, STATUS_CODES } = require('../utils/constants');

const createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(STATUS_CODES.CREATED).send(user))
    .catch((err) => {
      // console.log(err);
      if (err instanceof mongoose.Error.ValidationError || err.name === 'MongoServerError') {
        sendError(throwError(ERRORS.BAD_USER_REQUEST_ERROR.name), res);
        return;
      }
      sendError(throwError(ERRORS.INTERNAL_SERVER_ERROR.name), res);
    });
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(throwError(ERRORS.NOT_FOUND_USER_ERROR.name))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        sendError(throwError(ERRORS.BAD_USER_REQUEST_ERROR.name), res);
        return;
      }
      if (err.name === ERRORS.NOT_FOUND_USER_ERROR.name) {
        sendError(err, res);
        return;
      }
      sendError(throwError(ERRORS.INTERNAL_SERVER_ERROR.name), res);
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => sendError(err, res));
};

const updateUserProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(throwError(ERRORS.NOT_FOUND_USER_ERROR.name))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError
        || err instanceof mongoose.Error.ValidationError) {
        sendError(throwError(ERRORS.BAD_USER_PROFILE_REQUEST_ERROR.name), res);
        return;
      }
      if (err.name === ERRORS.NOT_FOUND_USER_ERROR.name) {
        sendError(err, res);
        return;
      }
      sendError(throwError(ERRORS.INTERNAL_SERVER_ERROR.name), res);
    });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(throwError(ERRORS.NOT_FOUND_USER_ERROR.name))
    .then((user) => res.send({ avatar: user.avatar }))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError
        || err instanceof mongoose.Error.ValidationError) {
        sendError(throwError(ERRORS.BAD_USER_AVATAR_REQUEST_ERROR.name), res);
        return;
      }
      if (err.name === ERRORS.NOT_FOUND_USER_ERROR.name) {
        sendError(err, res);
        return;
      }
      sendError(throwError(ERRORS.INTERNAL_SERVER_ERROR.name), res);
    });
};

module.exports = {
  createUser,
  getUserById,
  getUsers,
  updateUserProfile,
  updateUserAvatar,
};
