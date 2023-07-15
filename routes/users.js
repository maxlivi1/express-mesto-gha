const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUserInfo,
  getUsers,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');
const { URL_PATTERN } = require('../utils/constants');

userRouter.get('/', getUsers);
userRouter.get('/me', getUserInfo);
userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUserProfile);
userRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(URL_PATTERN),
  }),
}), updateUserAvatar);

module.exports = userRouter;
