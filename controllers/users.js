const mongoose = require('mongoose');
const { sendError } = require('../errors/sendError');
const User = require('../models/user');
const throwError = require('../errors/throwError');
const { ERRORS, STATUS_CODES } = require('../utils/constants');

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  if (name.trim().length < 2 || about.trim().length < 2 || avatar.trim().length < 2) {
    sendError(throwError(ERRORS.BAD_USER_REQUEST_ERROR.name), res);
    return;
  }

  User.create({ name, about, avatar })
    .then((user) => res.status(STATUS_CODES.CREATED).send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        sendError(throwError(ERRORS.BAD_USER_REQUEST_ERROR.name), res);
        return;
      }
      sendError(throwError(ERRORS.INTERNAL_SERVER_ERROR.name), res);
    });
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        sendError(throwError(ERRORS.NOT_FOUND_USER_ERROR.name), res);
        return;
      }
      res.status(STATUS_CODES.OK).send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError
        || err instanceof mongoose.Error.CastError) {
        sendError(throwError(ERRORS.NOT_FOUND_USER_ERROR.name), res);
        return;
      }
      sendError(throwError(ERRORS.INTERNAL_SERVER_ERROR.name), res);
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(STATUS_CODES.OK).send(users))
    .catch((err) => sendError(err, res));
};

const updateUserProfile = (req, res) => {
  const { name, about } = req.body;
  let userData = {};

  if (!name.trim() && !about.trim()) {
    sendError(throwError(ERRORS.BAD_USER_PROFILE_REQUEST_ERROR.name), res);
    return;
  }

  if (name.trim() && about.trim()) {
    userData = { name, about };
  } else if (name.trim()) {
    userData = { name };
  } else if (about.trim()) {
    userData = { about };
  }

  User.findByIdAndUpdate(req.user._id, userData, { new: true })
    .then((user) => {
      if (!user) {
        sendError(throwError(ERRORS.BAD_USER_PROFILE_REQUEST_ERROR.name), res);
        return;
      }
      res.status(STATUS_CODES.OK).send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError
        || err instanceof mongoose.Error.CastError) {
        sendError(throwError(ERRORS.NOT_FOUND_USER_ERROR.name), res);
        return;
      }
      if (err instanceof mongoose.Error.ValidationError) {
        sendError(throwError(ERRORS.BAD_USER_PROFILE_REQUEST_ERROR.name), res);
        return;
      }
      sendError(throwError(ERRORS.INTERNAL_SERVER_ERROR.name), res);
    });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => {
      if (!user) {
        sendError(throwError(ERRORS.BAD_USER_AVATAR_REQUEST_ERROR.name), res);
        return;
      }
      res.status(STATUS_CODES.OK).send({ avatar: user.avatar });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError
        || err instanceof mongoose.Error.CastError) {
        sendError(throwError(ERRORS.NOT_FOUND_USER_ERROR.name), res);
        return;
      }
      if (err instanceof mongoose.Error.ValidationError) {
        sendError(throwError(ERRORS.BAD_USER_PROFILE_REQUEST_ERROR.name), res);
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
