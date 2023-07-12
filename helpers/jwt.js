const jwt = require('jsonwebtoken');
const User = require('../models/user');

const JWT_SECRET = 'U5LgdqX2YGeDbu2VO5AIU7a20M9gN';

const getJwtToken = (id) => jwt.sign({ id }, JWT_SECRET, { expiresIn: '7d' });

const isAuthorized = (token) => jwt.verify(token, JWT_SECRET, (err, payload) => {
  if (err) return false;

  return User.findOne({ _id: payload.id })
    .then((user) => Boolean(user));
});
const getPayload = (token) => jwt.verify(token, JWT_SECRET, (err, payload) => {
  if (err) return null;
  console.log(payload);
  return payload;
});

module.exports = {
  getJwtToken,
  isAuthorized,
  getPayload,
};
