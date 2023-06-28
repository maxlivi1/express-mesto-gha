const userRouter = require('express').Router();
const { createUser, getUserById, getUsers } = require('../controllers/users');

userRouter.get('/', getUsers);
userRouter.get('/:id', getUserById);
userRouter.post('/', createUser);

module.exports = userRouter;
