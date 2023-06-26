const { isValidObjectId } = require('mongoose');
const Card = require('../models/card');

const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

const removeCard = (req, res, next) => {
  const { cardId } = req.params;

  if (!isValidObjectId(cardId)) {
    next(new BadRequestError('Переданы некорректные данные для удаления карточки'));
    return;
  }

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        return next(new NotFoundError('Переданы некорректные данные'));
      }
      if (!card.owner.equals(req.user._id)) {
        return next(new ForbiddenError('Попытка удалить чужую карточку'));
      }
      return card.deleteOne()
        .then(() => res.send({ message: 'Карточка удалена' }));
    })
    .catch(next);
};

// общая функция обновления данных карточки
const updateCardLike = (req, res, next, updateData) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    updateData,
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return next(new NotFoundError('Карточка с указанным _id не найдена.'));
      }
      return res.send(card.likes);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Переданы некорректные данные для постановки лайка.'));
      }
      return next(err);
    });
};

const addLikeCard = (req, res, next) => {
  const updateData = { $addToSet: { likes: req.user._id } };
  updateCardLike(req, res, next, updateData);
};

const removeLikeCard = (req, res, next) => {
  const updateData = { $pull: { likes: req.user._id } };
  updateCardLike(req, res, next, updateData);
};

module.exports = {
  getAllCards,
  createCard,
  removeCard,
  addLikeCard,
  removeLikeCard,
};
