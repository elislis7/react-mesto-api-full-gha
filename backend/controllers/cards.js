const { isValidObjectId } = require('mongoose');
const Card = require('../models/card');

const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

// возвращает все карточки
const getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

// создаёт карточку
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

// удаляет карточку
const removeCard = (req, res, next) => {
  const { cardId } = req.params;

  if (!isValidObjectId(cardId)) {
    next(new BadRequestError('Переданы некорректные данные для удаления карточки'));
    return;
  }

  Card.findByIdAndRemove({ _id: cardId })
    .then((card) => {
      if (!card) {
        return next(new ForbiddenError('Попытка удалить чужую карточку'));
      }
      return res.send({ message: 'Карточка удалена' });
    })
    .catch(next);
};

// создает лайк на карточке
const likeCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  if (!isValidObjectId(userId) || !isValidObjectId(cardId)) {
    next(new BadRequestError('Переданы некорректные данные для постановки лайка'));
    return;
  }

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return next(new NotFoundError('Карточка с указанным _id не найдена.'));
      }
      return res.status(201).send(card.likes);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные для постановки лайка.'));
      }
      return next(err);
    });
};

// удаляет лайк на карточке
const removeLikeCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  if (!isValidObjectId(userId) || !isValidObjectId(cardId)) {
    next(new BadRequestError('Переданы некорректные данные для удаления лайка'));
    return;
  }

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return next(new NotFoundError('Карточка с указанным _id не найдена'));
      }
      return res.status(200).send(card.likes);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные для снятия лайка.'));
      }
      return next(err);
    });
};

module.exports = {
  getAllCards,
  createCard,
  removeCard,
  likeCard,
  removeLikeCard,
};
