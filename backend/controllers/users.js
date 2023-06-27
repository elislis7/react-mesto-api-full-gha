const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');

const { JWT_SECRET, NODE_ENV } = process.env;

const getAllUsers = (req, res, next) => {
  User.find({})
    .then((data) => res.send({ data }))
    .catch(next);
};

// общая функция по поиску пользователя
const findUser = (id, res, next) => {
  User.findById(id)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return next(new NotFoundError('Пользователь по указанному _id не найден'));
      }
      return next(err);
    });
};

const getUser = (req, res, next) => findUser(req.params._id, res, next);

const getUsersByID = (req, res, next) => findUser(req.params.userId, res, next);

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name, about, avatar, email, password: hash,
      })
        .then(() => {
          res.status(201).send({
            data: {
              name, about, avatar, email,
            },
          });
        })
        .catch((err) => {
          if (err.code === 11000) {
            return next(new ConflictError('Пользователь с таким email уже существует'));
          }
          if (err.name === 'ValidationError') {
            return next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
          }
          return next(err);
        });
    })
    .catch(next);
};

const updateUser = (req, res, next, updateData) => {
  const { name, about, avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    updateData,
    {
      name,
      about,
      avatar,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return next(new NotFoundError('Пользователь по указанному _id не найден'));
      }
      return next(err);
    });
};

const updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  const updateData = { name, about };
  updateUser(req, res, next, updateData);
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const updateData = { avatar };
  updateUser(req, res, next, updateData);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'JWT-token', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

module.exports = {
  getAllUsers,
  getUsersByID,
  getUser,
  createUser,
  updateUserInfo,
  updateUserAvatar,
  login,
};
