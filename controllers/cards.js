const mongoose = require('mongoose');
const { sendError } = require('../errors/sendError');
const Card = require('../models/card');
const { STATUS_CODES, ERRORS } = require('../utils/constants');
const throwError = require('../errors/throwError');

const createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(STATUS_CODES.CREATED).send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError || err.name === 'TypeError') {
        sendError(throwError(ERRORS.BAD_CARD_REQUEST_ERROR.name), res);
        return;
      }
      sendError(throwError(ERRORS.INTERNAL_SERVER_ERROR.name), res);
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  const { _id } = req.user;

  Card.findById(cardId)
    .orFail(throwError(ERRORS.NOT_FOUND_CARD_ERROR.name))
    .then((card) => {
      if (!card) return throwError(ERRORS.NOT_FOUND_CARD_ERROR.name);
      if (_id !== card.owner.toString()) {
        res.send({ message: 'Вы не можете удалить эту карточку, так как не являетесь её хозяином' });
        return null;
      }
      return Card.findByIdAndRemove(cardId)
        .orFail(throwError(ERRORS.NOT_FOUND_CARD_ERROR.name))
        .then((removedCard) => res.send(removedCard))
        .catch((err) => {
          if (err instanceof mongoose.Error.CastError) {
            sendError(throwError(ERRORS.BAD_CARD_REQUEST_ERROR.name), res);
            return;
          }
          if (err.name === ERRORS.NOT_FOUND_CARD_ERROR.name) {
            sendError(err, res);
            return;
          }
          sendError(throwError(ERRORS.INTERNAL_SERVER_ERROR.name), res);
        });
    })
    .catch((err) => sendError(err, res));
};

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => sendError(err, res));
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(throwError(ERRORS.NOT_FOUND_CARD_ERROR.name))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        sendError(throwError(ERRORS.BAD_CARD_LIKE_REQUEST_ERROR.name), res);
        return;
      }
      if (err.name === ERRORS.NOT_FOUND_CARD_ERROR.name) {
        sendError(err, res);
        return;
      }
      sendError(throwError(ERRORS.INTERNAL_SERVER_ERROR.name), res);
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(throwError(ERRORS.NOT_FOUND_CARD_ERROR.name))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        sendError(throwError(ERRORS.BAD_CARD_LIKE_REQUEST_ERROR.name), res);
        return;
      }
      if (err.name === ERRORS.NOT_FOUND_CARD_ERROR.name) {
        sendError(err, res);
        return;
      }
      sendError(throwError(ERRORS.INTERNAL_SERVER_ERROR.name), res);
    });
};

module.exports = {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
};
