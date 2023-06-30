const User = require('../models/user');

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.status(200).send(user))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const updateUserProfile = (req, res) => {
  const { name, about } = req.body;
  let userData = {};

  if (!name.trim() && !about.trim()) {
    res.status(200).send({ message: 'Вы не передали обновленные данные! Так что ничего не изменилось!' });
  } else {
    if (name.trim() && about.trim()) {
      userData = { name, about };
    } else if (name.trim()) {
      userData = { name };
    } else if (about.trim()) {
      userData = { about };
    }

    User.findByIdAndUpdate(req.user._id, userData, { new: true })
      .then((user) => res.status(200).send(user))
      .catch((err) => res.status(500).send({ message: err.message }));
  }
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => res.status(200).send(user))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports = {
  createUser,
  getUserById,
  getUsers,
  updateUserProfile,
  updateUserAvatar,
};
