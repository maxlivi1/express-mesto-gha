const mongoose = require('mongoose');
const Card = require('../models/card');
const { STATUS_CODES, ERRORS } = require('../utils/constants');
const AppError = require('../errors/AppError');

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(STATUS_CODES.CREATED).send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        // console.log(err.message);
        // console.log(err);
        throw AppError(ERRORS.BAD_CARD_REQUEST_ERROR.name, STATUS_CODES.BAD_REQUEST_ERROR);
      }
      next(err);
    })
    .catch(next);
};

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(AppError(ERRORS.NOT_FOUND_CARD_ERROR.name, STATUS_CODES.NOT_FOUND_ERROR))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        throw AppError(ERRORS.BAD_CARD_LIKE_REQUEST_ERROR.name, STATUS_CODES.BAD_REQUEST_ERROR);
      }
      next(err);
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(AppError(ERRORS.NOT_FOUND_CARD_ERROR.name, STATUS_CODES.NOT_FOUND_ERROR))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        throw AppError(ERRORS.BAD_CARD_LIKE_REQUEST_ERROR.name, STATUS_CODES.BAD_REQUEST_ERROR);
      }
      next(err);
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const { _id } = req.user;

  Card.findById(cardId)
    .orFail(AppError(ERRORS.NOT_FOUND_CARD_ERROR.name, STATUS_CODES.NOT_FOUND_ERROR))
    .then((card) => {
      if (_id !== card.owner.toString()) {
        throw AppError(ERRORS.FORBIDDEN_ERROR.name, STATUS_CODES.FORBIDDEN_ERROR);
      }
      Card.deleteOne({ _id: card._id })
        .then(() => res.send(card))
        .catch((err) => {
          if (err instanceof mongoose.Error.CastError) {
            throw AppError(ERRORS.BAD_CARD_REQUEST_ERROR.name, STATUS_CODES.BAD_REQUEST_ERROR);
          }
          next(err);
        })
        .catch(next);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        throw AppError(ERRORS.BAD_CARD_REQUEST_ERROR.name, STATUS_CODES.BAD_REQUEST_ERROR);
      }
      next(err);
    })
    .catch(next);
};

module.exports = {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
};
