const userRouter = require('express').Router();
const {
  createUser,
  getUserById,
  getUsers,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');

userRouter.get('/', getUsers);
userRouter.get('/:userId', getUserById);
userRouter.post('/', createUser);
userRouter.patch('/me', updateUserProfile);
userRouter.patch('/me/avatar', updateUserAvatar);

module.exports = userRouter;
